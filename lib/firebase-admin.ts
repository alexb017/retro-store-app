import {
  initializeApp,
  cert,
  ServiceAccount,
  getApps,
  getApp,
} from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const serviceAccount = JSON.parse(process.env.FIRESBASE_SERVICE_ACCOUNT_KEY!);

const app = getApps().length
  ? getApp()
  : initializeApp({ credential: cert(serviceAccount as ServiceAccount) });

const db = getFirestore(app);

export { db };
