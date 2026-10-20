# نظام عرض النتائج

واجهة عربية متجاوبة للاستعلام عن نتائج الطلبة الجامعية، تعمل بالكامل داخل المتصفح دون قاعدة بيانات أو API.

## التقنيات

- React + Vite + TypeScript
- Tailwind CSS
- خط Cairo مضمن محلياً عبر `@fontsource/cairo`
- واجهة RTL متجاوبة

## التشغيل محلياً

يتطلب المشروع Node.js 20 أو أحدث.

```bash
npm install
npm run dev
```

افتح العنوان الذي يعرضه Vite، ويكون عادةً `http://localhost:5173`.

لبناء نسخة الإنتاج ومعاينتها:

```bash
npm run build
npm run preview
```

تُنشأ ملفات الإنتاج داخل مجلد `dist`.

## استخدام البحث

استخدم الرقم الامتحاني التالي:

```text
200325415043
```

## النشر عبر GitHub وVercel

1. أنشئ مستودعاً جديداً على GitHub.
2. ادفع ملفات المشروع إلى المستودع:

```bash
git init
git add .
git commit -m "Initial results site"
git branch -M main
git remote add origin https://github.com/USERNAME/REPOSITORY.git
git push -u origin main
```

3. سجّل الدخول إلى [Vercel](https://vercel.com) واختر **Add New → Project**.
4. استورد مستودع GitHub. سيكتشف Vercel إعدادات Vite تلقائياً.
5. تأكد أن أمر البناء هو `npm run build` ومجلد الإخراج هو `dist`، ثم اختر **Deploy**.

يتضمن المشروع ملف `vercel.json` الجاهز، كما يضيف ترويسات تمنع الفهرسة. ويمنع `public/robots.txt` جميع محركات البحث من فهرسة النموذج.
