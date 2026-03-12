# Food Rescue Hub

منصة احترافية لإنقاذ الطعام وتقليل الهدر، مبنية بـ Next.js وجاهزة للرفع على GitHub ثم النشر على Vercel.

## ما الموجود داخل المشروع؟
- واجهة عربية كاملة RTL
- تصميم احترافي ومتجاوب
- الصفحة الرئيسية
- صفحة التبرع بالفائض
- صفحة تسجيل فرق الاستلام
- لوحة أثر وإحصائيات
- صفحة عن المشروع
- صفحة تواصل تحفظ الرسائل داخل Firestore
- صور/إليستريشن مدمجة داخل المشروع
- وضع تجريبي يعمل فورًا بدون Firebase
- ربط مباشر مع Firebase Firestore عند إضافة مفاتيح البيئة

## التشغيل محليًا
```bash
npm install
npm run dev
```
ثم افتح:
```bash
http://localhost:3000
```

## النشر على GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

## النشر على Vercel
1. ارفع المشروع على GitHub
2. ادخل Vercel
3. اختر New Project
4. اربط المستودع
5. أضف متغيرات البيئة الموجودة في `.env.example` أو انسخ القيم المرفقة في هذا المشروع
6. اضغط Deploy

## Firebase
تمت إضافة إعدادات Firebase التي أرسلتها داخل `.env.local` و`.env.example`.
للنشر على Vercel انسخ نفس القيم كمتغيرات بيئة داخل إعدادات المشروع.

## ما الذي تحتاجه داخل Firebase؟
### 1) إنشاء مشروع Firebase
أنشئ مشروع جديد باسم مثل:
`food-rescue-hub`

### 2) تفعيل Firestore Database
- ادخل Firestore Database
- Create database
- اختر Production أو Test mode مؤقتًا
- اختر أقرب Region

### 3) إنشاء Web App
- اضغط أيقونة الويب `</>`
- سم التطبيق مثلًا `food-rescue-web`
- انسخ القيم وأضفها في `.env.local`

### 4) ملف البيئة
الملف `.env.local` موجود بالفعل داخل المشروع ومعبأ بالقيم الحالية.
عند النشر على Vercel أضف نفس القيم في Environment Variables.

## أسماء المجموعات التي يستخدمها الموقع
الموقع يحفظ داخل Firestore في ثلاث مجموعات:
- `donations`
- `pickup_requests`
- `contact_messages`

## مثال بسيط لقواعد Firestore للتجربة
> عدلها لاحقًا للأمان قبل الإطلاق الفعلي.

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /donations/{document=**} {
      allow read, write: if true;
    }
    match /pickup_requests/{document=**} {
      allow read, write: if true;
    }
  }
}
```

## ما يعمل الآن فعليًا
- حفظ التبرعات في `donations`
- حفظ فرق الاستلام في `pickup_requests`
- حفظ رسائل التواصل في `contact_messages`
- لوحة أثر حيّة تقرأ من Firestore مباشرة
- وضع تجريبي محلي إذا لم تتوفر قاعدة البيانات

## تحسينات مستقبلية جاهزة للإضافة
- تسجيل دخول للمشرفين والجهات
- خريطة للمواقع
- إشعارات فورية
- تقارير PDF
- تغيير حالات الطلبات من داخل لوحة إدارة كاملة

## ملاحظة
إذا لم تضف بيانات Firebase فالموقع سيبقى يعمل بوضع تجريبي باستخدام Local Storage حتى تستطيع استعراضه ورفعه بسهولة.
