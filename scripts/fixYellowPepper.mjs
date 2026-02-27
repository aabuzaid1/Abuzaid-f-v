import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { createInterface } from 'readline';

const app = initializeApp({
    apiKey: "AIzaSyCZZd43THVyLv6R4Az9AwqCGUzCrgh4Tds",
    authDomain: "abuzaidstore.firebaseapp.com",
    projectId: "abuzaidstore",
    storageBucket: "abuzaidstore.firebasestorage.app",
    messagingSenderId: "280450439481",
    appId: "1:280450439481:web:1bb95aed675bbf9e9830e8"
});

const db = getFirestore(app);
const authInstance = getAuth(app);

function ask(question) {
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    return new Promise(resolve => rl.question(question, answer => { rl.close(); resolve(answer); }));
}

async function fix() {
    // Step 1: Login as admin
    const email = await ask('Admin email: ');
    const password = await ask('Admin password: ');

    console.log('\n🔐 Logging in...');
    try {
        await signInWithEmailAndPassword(authInstance, email, password);
        console.log('✅ Logged in successfully!\n');
    } catch (err) {
        console.error('❌ Login failed:', err.message);
        process.exit(1);
    }

    // Step 2: Find all Yellow Bell Pepper duplicates
    const snap = await getDocs(collection(db, 'products'));
    console.log('Total products in Firestore:', snap.size);

    const yellowPeppers = [];
    snap.forEach(d => {
        const data = d.data();
        if (data.name && data.name.en === 'Yellow Bell Pepper') {
            yellowPeppers.push({ id: d.id, name: data.name });
        }
    });

    console.log('Yellow Bell Pepper copies found:', yellowPeppers.length);

    if (yellowPeppers.length > 1) {
        console.log('\nKeeping 1 copy:', yellowPeppers[0].id);
        console.log('Deleting', yellowPeppers.length - 1, 'duplicates...\n');

        for (let i = 1; i < yellowPeppers.length; i++) {
            try {
                await deleteDoc(doc(db, 'products', yellowPeppers[i].id));
                console.log('  ✅ Deleted:', yellowPeppers[i].id);
            } catch (err) {
                console.error('  ❌ Failed to delete', yellowPeppers[i].id, ':', err.message);
            }
        }
        console.log('\n🎉 Done! Only 1 Yellow Bell Pepper remains.');
    } else if (yellowPeppers.length === 1) {
        console.log('✨ Only 1 copy exists, no duplicates.');
    } else {
        console.log('⚠️ No Yellow Bell Pepper found in Firestore.');
    }

    process.exit(0);
}

fix();
