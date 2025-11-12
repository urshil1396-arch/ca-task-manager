# CA Task Manager (MVP)

React + Firebase + Tailwind + Vite. Free to run and deploy.

## 0) Prereqs
- Node 18+
- A free Firebase project (https://console.firebase.google.com)
- Enable: Authentication (Email/Password), Firestore
- Create at least 1 user in Authentication (Owner)

## 1) Firestore Rules
In Firebase console → Firestore → Rules → paste `firestore.rules` from this repo and **Publish**.

Create a document in `users/{uid}` for your owner account:
```json
{ "name": "Owner", "email": "<your email>", "role": "owner", "active": true }
