import { Box } from '../types';

export const boxes: Box[] = [
    {
        id: 'box-1',
        name: { ar: 'صندوق العيلة (خضار)', en: 'Family Veg Box' },
        description: {
            ar: 'تشكيلة متنوعة من الخضار الطازجة تكفي العائلة لأسبوع',
            en: 'A variety of fresh vegetables to last the family a week',
        },
        contents: {
            ar: ['2 كيلو بندورة', '2 كيلو خيار', '2 كيلو بطاطا', '1 كيلو بصل', '1 كيلو جزر', '1 كيلو كوسا', '1 باذنجان', '1 فلفل رومي', '1 ربطة بقدونس', '1 ربطة نعنع'],
            en: ['2 kg Tomatoes', '2 kg Cucumbers', '2 kg Potatoes', '1 kg Onions', '1 kg Carrots', '1 kg Zucchini', '1 Eggplant', '1 Bell Pepper', '1 bunch Parsley', '1 bunch Mint'],
        },
        price: 12.00,
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400',
        inStock: true,
    },
    {
        id: 'box-2',
        name: { ar: 'صندوق الفواكه', en: 'Fruit Box' },
        description: {
            ar: 'أشهى الفواكه الموسمية الطازجة',
            en: 'Delicious seasonal fresh fruits',
        },
        contents: {
            ar: ['2 كيلو تفاح', '2 كيلو برتقال', '1 كيلو موز', '1 كيلو عنب', '500 غرام فراولة'],
            en: ['2 kg Apples', '2 kg Oranges', '1 kg Bananas', '1 kg Grapes', '500g Strawberries'],
        },
        price: 14.00,
        image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400',
        inStock: true,
    },
    {
        id: 'box-3',
        name: { ar: 'صندوق العصير', en: 'Juice Box' },
        description: {
            ar: 'فواكه مثالية للعصائر الطازجة',
            en: 'Perfect fruits for fresh juices',
        },
        contents: {
            ar: ['3 كيلو برتقال', '2 كيلو جزر', '1 كيلو تفاح أخضر', '1 كيلو شمندر', '2 ربطة نعنع'],
            en: ['3 kg Oranges', '2 kg Carrots', '1 kg Green Apples', '1 kg Beetroot', '2 bunches Mint'],
        },
        price: 11.00,
        image: 'https://images.unsplash.com/photo-1622597467836-f3e7e50a0c4e?w=400',
        inStock: true,
    },
    {
        id: 'box-4',
        name: { ar: 'صندوق السلطة', en: 'Salad Box' },
        description: {
            ar: 'كل ما تحتاجه لسلطات طازجة ولذيذة',
            en: 'Everything you need for fresh, delicious salads',
        },
        contents: {
            ar: ['2 خس', '1 كيلو بندورة', '1 كيلو خيار', '2 ربطة جرجير', '1 ربطة بقدونس', '1 ربطة نعنع', '1 ربطة بصل أخضر', '1 فلفل رومي'],
            en: ['2 Lettuce', '1 kg Tomatoes', '1 kg Cucumbers', '2 bunches Arugula', '1 bunch Parsley', '1 bunch Mint', '1 bunch Green Onions', '1 Bell Pepper'],
        },
        price: 10.50,
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
        inStock: true,
    },
];
