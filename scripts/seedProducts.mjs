import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';

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

const products = [
    // ============ VEGETABLES ============
    { name: { ar: 'فليفلة صفراء', en: 'Yellow Bell Pepper' }, category: 'vegetables', price: 1.15, unit: 'kg', image: 'https://greenbasketstore.com/wp-content/uploads/2022/03/1.png', inStock: true },
    { name: { ar: 'فليفلة حمراء', en: 'Red Bell Pepper' }, category: 'vegetables', price: 1.15, unit: 'kg', image: 'https://damaskmart.com/cdn/shop/products/PHOTO-2021-05-22-17-52-552_1200x1200.jpg?v=1621884757', inStock: true },
    { name: { ar: 'فليفلة خضراء', en: 'Green Bell Pepper' }, category: 'vegetables', price: 0.75, unit: 'kg', image: 'https://palmyraorders.com/cdn/shop/files/capsicum-green-500g.jpg?v=1755770192&width=1000', inStock: true },
    { name: { ar: 'فليفلة برتقالية', en: 'Orange Bell Pepper' }, category: 'vegetables', price: 1.15, unit: 'kg', image: 'https://cdn.mafrservices.com/sys-master-root/hc5/h94/14379755831326/78432_main.jpg', inStock: true },
    { name: { ar: 'فلفل حار', en: 'Hot Pepper' }, category: 'vegetables', price: 1.00, unit: 'kg', image: 'https://media.zid.store/3dfac062-0e10-4b87-af14-41b816f1152c/a4cd7c80-e347-49a3-93ec-cc91c5e8f79c.jpg', inStock: true },
    { name: { ar: 'ليمون أصفر', en: 'Yellow Lemon' }, category: 'vegetables', price: 1.25, unit: 'kg', image: 'https://images.unsplash.com/photo-1590502593747-42a996133562?w=400&h=400&fit=crop', inStock: true },
    { name: { ar: 'بندورة', en: 'Tomatoes' }, category: 'vegetables', price: 0.50, unit: 'kg', image: 'https://almozon-jo.com/wp-content/uploads/2024/12/%D8%A8%D9%86%D8%AF%D9%88%D8%B1%D8%A9.png', inStock: true, isBestSeller: true },
    { name: { ar: 'كوسا', en: 'Zucchini' }, category: 'vegetables', price: 0.90, unit: 'kg', image: 'https://www.vegetables.bayer.com/content/dam/bayer-vegetables/product-photography/squash/Seminis_Squash_Anita_ES_01.jpg', inStock: true },
    { name: { ar: 'باذنجان كلاسيك', en: 'Classic Eggplant' }, category: 'vegetables', price: 0.90, unit: 'kg', image: 'https://yanboot.com/shop/image/cache/catalog/Vegetables/Organic%20Eggplants-500x500.jpg', inStock: true },
    { name: { ar: 'زهرة', en: 'Cauliflower' }, category: 'vegetables', price: 0.75, unit: 'piece', image: 'https://media.zid.store/426a510a-a3da-4c3e-a9cb-133f5c23c457/6ccefe55-369d-40a7-8ed4-641843812c21.jpeg', inStock: true },
    { name: { ar: 'بطاطا', en: 'Potatoes' }, category: 'vegetables', price: 0.67, unit: 'kg', image: 'https://bf1af2.akinoncloudcdn.com/products/2024/09/20/60250/fd037430-c8fc-4be8-a4b1-d3c12225785f.jpg', inStock: true, isBestSeller: true },
    { name: { ar: 'خيار', en: 'Cucumbers' }, category: 'vegetables', price: 0.65, unit: 'kg', image: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=400&h=400&fit=crop', inStock: true, isBestSeller: true },
    { name: { ar: 'بصل أبيض', en: 'White Onion' }, category: 'vegetables', price: 0.50, unit: 'kg', image: 'https://cdn.mafrservices.com/sys-master-root/ha3/hbd/49111617929246/33218_main.jpg?im=Resize=376', inStock: true },
    { name: { ar: 'ربطة ثوم', en: 'Garlic Bunch' }, category: 'vegetables', price: 0.75, unit: 'bunch', image: 'https://images.b3na.com/Upload/ImageProduct%2F68135%2F1717184357.webp', inStock: true },
    { name: { ar: 'باذنجان رفيع', en: 'Slim Eggplant' }, category: 'vegetables', price: 0.75, unit: 'kg', image: 'https://images.b3na.com/Upload/ImageProduct%2F68135%2F1717182855.webp?alt=media', inStock: true },

    // ============ FRUITS ============
    { name: { ar: 'برتقال عصير موردي', en: 'Morridi Juice Oranges' }, category: 'fruits', price: 0.65, unit: 'kg', image: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=400&h=400&fit=crop', inStock: true, isBestSeller: true },
    { name: { ar: 'برتقال عصير فرنساوي', en: 'French Juice Oranges' }, category: 'fruits', price: 0.65, unit: 'kg', image: 'https://emdadx.com/wp-content/uploads/2023/09/Orange-Valencia-1-Kg.jpg', inStock: true },
    { name: { ar: 'برتقال جريفوت', en: 'Grapefruit' }, category: 'fruits', price: 0.60, unit: 'kg', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Citrus_paradisi_%28Grapefruit%2C_pink%29_white_bg.jpg/330px-Citrus_paradisi_%28Grapefruit%2C_pink%29_white_bg.jpg', inStock: true },
    { name: { ar: 'كيوي', en: 'Kiwi' }, category: 'fruits', price: 3.50, unit: 'kg', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Kiwi_%28Actinidia_chinensis%29_1_Luc_Viatour.jpg/1280px-Kiwi_%28Actinidia_chinensis%29_1_Luc_Viatour.jpg', inStock: true },
    { name: { ar: 'انجاص', en: 'Pears' }, category: 'fruits', price: 2.50, unit: 'kg', image: 'https://storage.googleapis.com/download/storage/v1/b/biddimarket-assets/o/1550020-1550020-ai-optimized.png?generation=1768328910992609&alt=media', inStock: true },
    { name: { ar: 'كاكا اسباني', en: 'Spanish Persimmon' }, category: 'fruits', price: 4.00, unit: 'kg', image: 'https://palmyraorders.com/cdn/shop/files/persimmon-kaki-fruit-spain-500g-uae.jpg?v=1756035187&width=1214', inStock: true },
    { name: { ar: 'جوافة', en: 'Guava' }, category: 'fruits', price: 2.50, unit: 'kg', image: 'https://cdn.mafrservices.com/sys-master-root/hef/h8c/12838553813022/446902_main.jpg', inStock: true },
    { name: { ar: 'بوملي', en: 'Pomelo' }, category: 'fruits', price: 1.00, unit: 'piece', image: 'https://palmyraorders.com/cdn/shop/files/green-pomelo-china-1-pc.jpg?v=1756619890&width=1000', inStock: true },
    { name: { ar: 'تفاح زبداني', en: 'Zebdani Apples' }, category: 'fruits', price: 1.75, unit: 'kg', image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=400&h=400&fit=crop', inStock: true },
    { name: { ar: 'تفاح أحمر', en: 'Red Apples' }, category: 'fruits', price: 1.75, unit: 'kg', image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop', inStock: true, isBestSeller: true },
    { name: { ar: 'تفاح أخضر', en: 'Green Apples' }, category: 'fruits', price: 1.75, unit: 'kg', image: 'https://cdn.salla.sa/XPpjy/KTaDrDmYrNhK17JGTm385rjtVIf6hPTSo0naPeAV.jpg', inStock: true },
    { name: { ar: 'تفاح أصفر', en: 'Yellow Apples' }, category: 'fruits', price: 1.75, unit: 'kg', image: 'https://bazar-center.com/246007-large_default/%D8%AA%D9%81%D8%A7%D8%AD_%D8%A7%D8%B5%D9%81%D8%B1_%D9%88%D8%B2%D9%86.jpg', inStock: true },
    { name: { ar: 'كيوي', en: 'Kiwi' }, category: 'fruits', price: 3.50, unit: 'kg', image: 'https://images.unsplash.com/photo-1585059895524-72359e06133a?w=400&h=400&fit=crop', inStock: true },
    { name: { ar: 'عنب حلواني', en: 'Halwani Grapes' }, category: 'fruits', price: 2.50, unit: 'kg', image: 'https://jebnalak.com/cdn/shop/files/Jebnalak-2024-10-19T200353.749_1024x1024.png?v=1729357445', inStock: true },
    { name: { ar: 'عنب أخضر', en: 'Green Grapes' }, category: 'fruits', price: 2.50, unit: 'kg', image: 'https://cdn.salla.sa/AzeKdY/86f3d98f-f701-4eb7-9c04-f11dd497f9c7-1000x800.33840947547-kPl0KdJoDUtJ8Whwt3OOply1FfRqITpPlvB7FTpZ.png', inStock: true },
    { name: { ar: 'برتقال شموطي', en: 'Shamouti Oranges' }, category: 'fruits', price: 1.25, unit: 'kg', image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=400&h=400&fit=crop', inStock: true },
    { name: { ar: 'برتقال ابوصرة', en: 'Navel Oranges' }, category: 'fruits', price: 1.25, unit: 'kg', image: 'https://cdn.salla.sa/oBEzY/Otdw7fQtTYGoEJjsVdjgQmXITHgbkn0q8do79fl2.jpg', inStock: true },
    { name: { ar: 'مندلينا', en: 'Mandalina' }, category: 'fruits', price: 1.25, unit: 'kg', image: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Satsuma_mandarin-cutout.jpg', inStock: true },
    { name: { ar: 'بندورة شيري', en: 'Cherry Tomatoes' }, category: 'fruits', price: 0.50, unit: 'box', image: 'https://cdn.salla.sa/oqYdG/yfmAYwyZWqldYLaqktYghSRJZTY2vOin82YbqkvS.png', inStock: true },
    { name: { ar: 'فراولة', en: 'Strawberries' }, category: 'fruits', price: 3.50, unit: 'kg', image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=400&fit=crop', inStock: true, isBestSeller: true },
    { name: { ar: 'زنجبيل', en: 'Ginger' }, category: 'fruits', price: 1.00, unit: 'gram250', image: 'https://static.webteb.net/images/content/tbl_articles_article_27928_941a6a0c633-c9e4-49d5-90f7-a04a04f5b90c.jpg', inStock: true },
    { name: { ar: 'جوز هند', en: 'Coconut' }, category: 'fruits', price: 2.50, unit: 'piece', image: 'https://images.unsplash.com/photo-1580984969071-a8da8c33b667?w=400&h=400&fit=crop', inStock: true },

    // ============ HERBS ============
    { name: { ar: 'نعنع', en: 'Mint' }, category: 'herbs', price: 0.15, unit: 'bunch', image: 'https://images.unsplash.com/photo-1588908933351-eeb8cd4c4521?w=500&auto=format&fit=crop&q=60', inStock: true, isBestSeller: true },
    { name: { ar: 'بقدونس', en: 'Parsley' }, category: 'herbs', price: 0.15, unit: 'bunch', image: 'https://images.unsplash.com/photo-1590759485418-90509afec818?w=500&auto=format&fit=crop&q=60', inStock: true, isBestSeller: true },
    { name: { ar: 'جرجير', en: 'Arugula' }, category: 'herbs', price: 0.15, unit: 'bunch', image: 'https://images.unsplash.com/photo-1603496987335-2cb9e257215d?w=500&auto=format&fit=crop&q=60', inStock: true },
    { name: { ar: 'فجل', en: 'Radish' }, category: 'herbs', price: 0.50, unit: 'bunch', image: 'https://images.unsplash.com/photo-1593026122758-19bebc625104?w=500&auto=format&fit=crop&q=60', inStock: true },
    { name: { ar: 'زعتر', en: 'Thyme' }, category: 'herbs', price: 1.50, unit: 'kg', image: 'https://plus.unsplash.com/premium_photo-1726138617688-e6bfd9f0de5c?w=500&auto=format&fit=crop&q=60', inStock: true },
    { name: { ar: 'كزبرة', en: 'Cilantro' }, category: 'herbs', price: 0.15, unit: 'bunch', image: 'https://images.unsplash.com/photo-1535189487909-a262ad10c165?w=500&auto=format&fit=crop&q=60', inStock: true },
    { name: { ar: 'شبت', en: 'Dill' }, category: 'herbs', price: 0.25, unit: 'bunch', image: 'https://images.unsplash.com/photo-1509210459313-17feefdff5cd?w=500&auto=format&fit=crop&q=60', inStock: true },
    { name: { ar: 'كرات', en: 'Leek' }, category: 'herbs', price: 0.25, unit: 'bunch', image: 'https://images.unsplash.com/photo-1549913468-0ddc24a4a1bf?w=500&auto=format&fit=crop&q=60', inStock: true },
    { name: { ar: 'رشاد', en: 'Garden Cress' }, category: 'herbs', price: 0.25, unit: 'bunch', image: 'https://images.unsplash.com/photo-1500420416454-4c0a15d2bf2a?w=500&auto=format&fit=crop&q=60', inStock: true },
    { name: { ar: 'حوارنة', en: 'Howarni Greens' }, category: 'herbs', price: 0.50, unit: 'bunch', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop', inStock: true },
    { name: { ar: 'هندبة', en: 'Chicory' }, category: 'herbs', price: 0.33, unit: 'bunch', image: 'https://media.istockphoto.com/id/496615056/photo/fresh-endive.webp?a=1&b=1&s=612x612&w=0&k=20&c=5GqcH-2xsQ7pergyGRZIeRNxBPu3d__Yd1lXGxqrfD8=', inStock: true },
    { name: { ar: 'ورق عنب بلدي', en: 'Local Grape Leaves' }, category: 'herbs', price: 4.50, unit: 'kg', image: 'https://specialtyproduce.com/sppics/627.png', inStock: true },
    { name: { ar: 'خبيزة', en: 'Khobeizeh' }, category: 'herbs', price: 0.50, unit: 'bunch', image: 'https://thumbs.dreamstime.com/b/wild-cheeseweed-mallow-malva-sylvestris-leaves-plant-152397911.jpg', inStock: true },
    { name: { ar: 'كرفس', en: 'Celery' }, category: 'herbs', price: 1.50, unit: 'kg', image: 'https://images.unsplash.com/photo-1742805286467-305b3529c00a?w=500&auto=format&fit=crop&q=60', inStock: true },
    { name: { ar: 'جزر أحمر', en: 'Red Carrots' }, category: 'herbs', price: 1.25, unit: 'kg', image: 'https://media.istockphoto.com/id/155371952/photo/purple-dragon-carrots-on-white-background.jpg?s=612x612&w=0&k=20&c=yJNMH2BnB6I8rJTuS0ZXe11iEHnHyDMiHjgKmVaM9_Q=', inStock: true },
    { name: { ar: 'ورق لسان', en: 'Tongue Leaves' }, category: 'herbs', price: 1.50, unit: 'kg', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCSU9kEDXhqvMRFRqAFQBdh9nF80ioOusgKg&s', inStock: true },
    { name: { ar: 'لفت', en: 'Turnip' }, category: 'herbs', price: 0.50, unit: 'bunch', image: 'https://media.istockphoto.com/id/137594783/photo/whole-purple-headed-turnips.webp?a=1&b=1&s=612x612&w=0&k=20&c=0VErt4RyVua56Zt8Lm6K4Uvp_Sw5UmKo8Mh41EncWd8=', inStock: true },
    { name: { ar: 'قلقاس', en: 'Taro' }, category: 'herbs', price: 1.50, unit: 'kg', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSVb-Z8CJVQ6dZfMfSCV07hlhzUHC6dc_DXlmFUMDFl6bIAXZTGTOzpxHmyBlmhO66JfvNCozrh8sb6Ed1LEhxRBXoohxCPfpBVNFuMvuD&s=10', inStock: true },
    { name: { ar: 'ملفوف أحمر', en: 'Red Cabbage' }, category: 'herbs', price: 0.50, unit: 'piece', image: 'https://images.unsplash.com/photo-1508515366614-44664045eb3a?w=500&auto=format&fit=crop&q=60', inStock: true },
    { name: { ar: 'بروكلي', en: 'Broccoli' }, category: 'herbs', price: 1.50, unit: 'kg', image: 'https://images.unsplash.com/photo-1685504445355-0e7bdf90d415?w=500&auto=format&fit=crop&q=60', inStock: true },
    { name: { ar: 'خس ايسبرغ', en: 'Iceberg Lettuce' }, category: 'herbs', price: 0.50, unit: 'piece', image: 'https://images.unsplash.com/photo-1640958904159-51ae08bd3412?w=500&auto=format&fit=crop&q=60', inStock: true },
    { name: { ar: 'خس بلدي', en: 'Local Lettuce' }, category: 'herbs', price: 0.33, unit: 'piece', image: 'https://images.unsplash.com/photo-1687199128888-ae7cbdfd6098?w=500&auto=format&fit=crop&q=60', inStock: true },
    { name: { ar: 'ميرامية', en: 'Sage' }, category: 'herbs', price: 1.50, unit: 'kg', image: 'https://images.unsplash.com/photo-1633933329875-044a32f4837f?w=500&auto=format&fit=crop&q=60', inStock: true },
    { name: { ar: 'بصل أخضر', en: 'Green Onions' }, category: 'herbs', price: 1.50, unit: 'kg', image: 'https://images.unsplash.com/photo-1602769515559-e15133a7e992?w=500&auto=format&fit=crop&q=60', inStock: true },
    { name: { ar: 'بتنجان رفيع', en: 'Slim Eggplant' }, category: 'herbs', price: 0.75, unit: 'kg', image: 'https://plus.unsplash.com/premium_photo-1737073968620-ea97cfc1c3b9?w=500&auto=format&fit=crop&q=60', inStock: true },
    { name: { ar: 'فاصولية', en: 'Green Beans' }, category: 'herbs', price: 1.25, unit: 'kg', image: 'https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0?w=400&h=400&fit=crop', inStock: true },
    { name: { ar: 'خيار بيبي', en: 'Baby Cucumbers' }, category: 'herbs', price: 1.25, unit: 'kg', image: 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=500&auto=format&fit=crop&q=60', inStock: true },
    { name: { ar: 'شمندر', en: 'Beetroot' }, category: 'herbs', price: 0.75, unit: 'kg', image: 'https://images.unsplash.com/photo-1593105544559-ecb03bf76f82?w=400&h=400&fit=crop', inStock: true },
    { name: { ar: 'فلفل أحمر حار', en: 'Red Hot Pepper' }, category: 'herbs', price: 0.75, unit: 'kg', image: 'https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=400&h=400&fit=crop', inStock: true },
    { name: { ar: 'فاصولية عريضة', en: 'Broad Beans' }, category: 'herbs', price: 1.50, unit: 'kg', image: 'https://images.unsplash.com/photo-1715941873135-217c6f7c7f42?w=500&auto=format&fit=crop&q=60', inStock: true },
    { name: { ar: 'لوبية', en: 'Black-eyed Peas' }, category: 'herbs', price: 1.30, unit: 'kg', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM9qLRzVVfedV5CNTijJxzrcM1UuZcYHdD1HnWTTiyDMJxc4T0lbNi7KgJdWyPRU7lhvq-yoV3xPoKPJ4XAFej3LhZ8wYzC4jdWDYoyVnWVw&s=10', inStock: true },
    { name: { ar: 'ملفوف', en: 'Cabbage' }, category: 'herbs', price: 1.00, unit: 'piece', image: 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=400&h=400&fit=crop', inStock: true },
    { name: { ar: 'بابونج', en: 'Chamomile' }, category: 'herbs', price: 1.50, unit: 'kg', image: 'https://images.unsplash.com/photo-1596343621063-c7a7aaf37aa6?w=500&auto=format&fit=crop&q=60', inStock: true },
    { name: { ar: 'ريحان', en: 'Basil' }, category: 'herbs', price: 1.00, unit: 'box', image: 'https://plus.unsplash.com/premium_photo-1725899523683-838307ab1552?w=500&auto=format&fit=crop&q=60', inStock: true },
    { name: { ar: 'شومر', en: 'Fennel' }, category: 'herbs', price: 0.20, unit: 'bunch', image: 'https://images.unsplash.com/photo-1701189975806-97b11541ec82?w=500&auto=format&fit=crop&q=60', inStock: true },

    // ============ ORGANIC ============
    { name: { ar: 'بندورة عضوية', en: 'Organic Tomatoes' }, category: 'organic', price: 1.50, unit: 'kg', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=400&fit=crop', inStock: true },
    { name: { ar: 'خس عضوي', en: 'Organic Lettuce' }, category: 'organic', price: 0.80, unit: 'piece', image: 'https://images.unsplash.com/photo-1556801712-76c8eb07c2b0?w=400&h=400&fit=crop', inStock: true },
    { name: { ar: 'جزر عضوي', en: 'Organic Carrots' }, category: 'organic', price: 1.20, unit: 'kg', image: 'https://images.unsplash.com/photo-1582515073490-39981397c445?w=400&h=400&fit=crop', inStock: true },
    { name: { ar: 'خيار عضوي', en: 'Organic Cucumbers' }, category: 'organic', price: 1.25, unit: 'kg', image: 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=400&h=400&fit=crop', inStock: true },
    { name: { ar: 'تفاح عضوي', en: 'Organic Apples' }, category: 'organic', price: 2.50, unit: 'kg', image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=400&h=400&fit=crop', inStock: true },

    // ============ IMPORTED ============
    { name: { ar: 'أفوكادو', en: 'Avocado' }, category: 'imported', price: 1.00, unit: 'piece', image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=400&fit=crop', inStock: true, isBestSeller: true },
    { name: { ar: 'كيوي', en: 'Kiwi' }, category: 'imported', price: 3.00, unit: 'kg', image: 'https://images.unsplash.com/photo-1585059895524-72359e06133a?w=400&h=400&fit=crop', inStock: true },
    { name: { ar: 'مانجو', en: 'Mango' }, category: 'imported', price: 2.50, unit: 'piece', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=400&fit=crop', inStock: true, isDeal: true, dealPrice: 2.00 },
    { name: { ar: 'أناناس', en: 'Pineapple' }, category: 'imported', price: 2.50, unit: 'piece', image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400&h=400&fit=crop', inStock: true },
    { name: { ar: 'توت أزرق', en: 'Blueberries' }, category: 'imported', price: 4.00, unit: 'gram250', image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400&h=400&fit=crop', inStock: true },
    { name: { ar: 'توت أحمر', en: 'Raspberries' }, category: 'imported', price: 4.50, unit: 'gram250', image: 'https://images.unsplash.com/photo-1577069861033-55d04cec4ef5?w=400&h=400&fit=crop', inStock: true },
    { name: { ar: 'جريب فروت', en: 'Grapefruit' }, category: 'imported', price: 1.50, unit: 'piece', image: 'https://images.unsplash.com/photo-1577234286642-fc512a5f8f11?w=400&h=400&fit=crop', inStock: true },
    { name: { ar: 'كرز', en: 'Cherries' }, category: 'imported', price: 8.00, unit: 'kg', image: 'https://images.unsplash.com/photo-1528821128474-27f963b062bf?w=400&h=400&fit=crop', inStock: false },
];

async function seed() {
    const existing = await getDocs(collection(db, 'products'));
    if (!existing.empty) {
        console.log(`\n⚠️  Database already has ${existing.size} products. Skipping seed.`);
        console.log('   Delete collection first if you want to re-seed.\n');
        process.exit(0);
    }

    console.log(`\n🌱 Seeding ${products.length} products to Firestore...\n`);
    let count = 0;
    for (const product of products) {
        try {
            await addDoc(collection(db, 'products'), {
                ...product,
                createdAt: serverTimestamp(),
            });
            count++;
            console.log(`  ✅ ${count}/${products.length} - ${product.name.en}`);
        } catch (err) {
            console.error(`  ❌ Failed: ${product.name.en}`, err.message);
        }
    }
    console.log(`\n🎉 Done! Seeded ${count}/${products.length} products to Firestore.\n`);
    process.exit(0);
}

seed();
