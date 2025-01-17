const CACHE_NAME = 'seedling-cache-v1';
const urlsToCache = [
  '/',
  '/habits',
  '/garden',
  '/index.css',
  '/manifest.json',
  '/favicon.ico',
];

// Open or create the IndexedDB database
const dbPromise = indexedDB.open('HabitsDB', 1);

dbPromise.onupgradeneeded = (event) => {
  const db = event.target.result;
  if (!db.objectStoreNames.contains('habits')) {
    db.createObjectStore('habits', { keyPath: 'id' });
  }
};

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request).then(
          (response) => {
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            return response;
          }
        );
      })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Offline data sync
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-habits') {
    event.waitUntil(syncHabits());
  }
});

async function getUnsyncedHabits() {
  const db = await dbPromise;
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('habits', 'readonly');
    const store = transaction.objectStore('habits');
    const request = store.getAll();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const habits = request.result.filter(habit => !habit.synced);
      resolve(habits);
    };
  });
}

async function syncHabit(habit) {
  // In a real-world scenario, you would send this data to your server
  // For demonstration purposes, we'll simulate a successful sync
  return fetch('/api/sync-habit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(habit),
  }).then(response => {
    if (!response.ok) {
      throw new Error('Failed to sync habit');
    }
    return response.json();
  });
}

async function markHabitSynced(habitId) {
  const db = await dbPromise;
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('habits', 'readwrite');
    const store = transaction.objectStore('habits');
    const request = store.get(habitId);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const habit = request.result;
      habit.synced = true;
      const updateRequest = store.put(habit);
      updateRequest.onerror = () => reject(updateRequest.error);
      updateRequest.onsuccess = () => resolve();
    };
  });
}

async function syncHabits() {
  const habitsToSync = await getUnsyncedHabits();
  for (const habit of habitsToSync) {
    try {
      await syncHabit(habit);
      await markHabitSynced(habit.id);
    } catch (error) {
      console.error('Failed to sync habit:', error);
    }
  }
}