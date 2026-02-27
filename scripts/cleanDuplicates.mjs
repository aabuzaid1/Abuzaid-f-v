import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCZZd43THVyLv6R4Az9AwqCGUzCrgh4Tds",
    authDomain: "abuzaidstore.firebaseapp.com",
    projectId: "abuzaidstore",
    storageBucket: "abuzaidstore.firebasestorage.app",
    messagingSenderId: "280450439481",
    appId: "1:280450439481:web:1bb95aed675bbf9e9830e8",
    measurementId: "G-DMWCLMK4PM"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function cleanDuplicates() {
    console.log('\n🔍 Fetching all products from Firestore...\n');

    const productsSnapshot = await getDocs(collection(db, 'products'));
    const products = [];

    productsSnapshot.forEach((doc) => {
        products.push({
            id: doc.id,
            ...doc.data()
        });
    });

    console.log(`📦 Found ${products.length} total products\n`);

    // Group products by English name
    const productsByName = {};

    products.forEach(product => {
        const name = product.name?.en || 'Unknown';
        if (!productsByName[name]) {
            productsByName[name] = [];
        }
        productsByName[name].push(product);
    });

    // Find duplicates
    let duplicatesCount = 0;
    let deletedCount = 0;

    for (const [name, items] of Object.entries(productsByName)) {
        if (items.length > 1) {
            duplicatesCount++;
            console.log(`\n⚠️  Found ${items.length} copies of "${name}"`);
            console.log(`   Keeping: ${items[0].id}`);

            // Delete all duplicates except the first one
            for (let i = 1; i < items.length; i++) {
                try {
                    await deleteDoc(doc(db, 'products', items[i].id));
                    console.log(`   ✅ Deleted: ${items[i].id}`);
                    deletedCount++;
                } catch (error) {
                    console.error(`   ❌ Failed to delete ${items[i].id}:`, error.message);
                }
            }
        }
    }

    if (duplicatesCount === 0) {
        console.log('\n✨ No duplicates found! Database is clean.\n');
    } else {
        console.log(`\n🎉 Done! Removed ${deletedCount} duplicate products.`);
        console.log(`   ${duplicatesCount} unique products had duplicates.\n`);
    }

    process.exit(0);
}

cleanDuplicates();
