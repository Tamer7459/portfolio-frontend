export interface Profile {
    name: string
    role: string
    bio: string
    photo_url: string | null
    cv_url: string | null
    github: string
    linkedin: string
    email: string
    whatsapp: string
    years_experience: number
    projects_count: number
    skills: { id: number; name: string; percentage: number }[]
}

export interface ProjectMedia {
    type: 'image' | 'video'
    url: string
}

export interface Project {
    id: number
    title: string
    subtitle: string
    description?: string
    tags: { id: number; name: string }[]
    github_url: string
    live_url: string
    image_url: string | null
    media: ProjectMedia[]
    status: string
    featured: boolean
    category: 'team' | 'best' | 'simple'
}

export const profile: Profile = {
    name: 'Bali Abdelkouddous',
    role: 'Software Engineer & Mentor · Web, Mobile & Desktop',
    bio: 'Abdelkouddous Baali is a self-taught software engineer and programming mentor based in Algeria. He builds production-grade web, mobile, and desktop applications using React, Laravel 10, PostgreSQL, Docker, and most major web technologies, with hands-on deployment experience on Vercel and Render.com.\n\nHis most notable project is GFR — a full-stack academic networking platform with 28+ REST API endpoints and multi-role access control, which won 1st place at a competitive hackathon. He also conceptualized ProDZ, a startup targeting Algeria\'s service provider market.\n\nBeyond building software, he teaches programming across all fields — web, mobile, and desktop — helping beginners grow into confident developers through practical, project-based learning. He also combines a serious interest in cybersecurity (Kali Linux, Metasploit, web security) with academic research, and aims long-term to specialize in scientific research and pursue postgraduate studies in Italy.',
    photo_url: 'https://res.cloudinary.com/dme6jhgkm/image/upload/v1791320988/myphoto_fbiubg.jpg',
    cv_url: 'https://drive.google.com/file/d/11-0TC8jBbgAN-OUrh4K11C_1lydzVj5d/view?usp=sharing',
    github: 'https://github.com/Tamer7459',
    linkedin: 'https://linkedin.com/in/abdelkouddous-bali-28032436a',
    email: 'tamerinale@gmail.com',
    whatsapp: '+213549964508',
    years_experience: 3,
    projects_count: 18,
    skills: []
}

export interface BlogPost {
    id: number
    title: string
    slug: string
    excerpt: string
    read_time: number
    created_at: string
    tags: { id: number; name: string }[]
}

export const blogPosts: BlogPost[] = []

export type LessonBlock =
    | { type: 'heading'; text: string; level?: 2 | 3 }
    | { type: 'paragraph'; text: string }
    | { type: 'image'; url: string; alt?: string; caption?: string }
    | { type: 'video'; url: string; caption?: string }
    | { type: 'code'; language?: string; code: string }
    | { type: 'list'; items: string[]; ordered?: boolean }
    | { type: 'table'; headers: string[]; rows: string[][] }
    | { type: 'quote'; text: string }

export interface Lesson {
    id: number
    title: string
    excerpt: string
    cover_url: string | null
    tags: { id: number; name: string }[]
    read_time: number
    created_at: string
    featured: boolean
    dir?: 'rtl' | 'ltr'
    content: LessonBlock[]
}

export const lessons: Lesson[] = [
    {
        id: 1,
        title: 'إعداد Firebase مع Flutter: من الصفر إلى التشغيل',
        excerpt: 'درس عملي بالعربية: افهم Firebase، أنشئ مشروعك، ثبّت الأدوات، هيّئ Android وWeb، وشغّل تطبيقك — مع الجداول والأكواد وحلول الأخطاء الشائعة وتمارين تقييم.',
        cover_url: null,
        tags: [
            { id: 101, name: 'Flutter' },
            { id: 102, name: 'Firebase' },
            { id: 103, name: 'Dart' }
        ],
        read_time: 20,
        created_at: '2026-10-11',
        featured: true,
        dir: 'rtl',
        content: [
            { type: 'heading', text: '🎯 أهداف الدرس' },
            { type: 'paragraph', text: 'بنهاية هذا الدرس، ستكون قادرًا على:' },
            { type: 'list', items: ['فهم مفهوم Firebase وخدماته الأساسية.', 'إنشاء مشروع Firebase وربطه بتطبيق Flutter موجود.', 'تثبيت Firebase CLI وFlutterFire CLI والتحقق من عملهما.', 'إعداد المنصات المطلوبة باستخدام `flutterfire configure`.', 'تهيئة Firebase باستخدام `Firebase.initializeApp()`.', 'فهم دور `firebase_options.dart` وملفات إعداد المنصات.', 'اختبار الاتصال واكتشاف أخطاء الإعداد الشائعة.', 'التمييز بين إعداد Firebase وحماية بيانات التطبيق في بيئة الإنتاج.'] },
            { type: 'heading', text: '1. ما هو Firebase؟' },
            { type: 'paragraph', text: 'Firebase منصة من Google توفر خدمات خلفية سحابية لتطوير التطبيقات، وتُعرف ضمن فئة Backend-as-a-Service (BaaS).' },
            { type: 'paragraph', text: 'بدلًا من بناء كل مكونات الخادم من الصفر، يمكنك استخدام خدمات جاهزة للمصادقة، وقواعد البيانات، وتخزين الملفات، والإشعارات.' },
            { type: 'table', headers: ['الخدمة', 'الاستخدام'], rows: [['Firebase Authentication', 'تسجيل الدخول وإنشاء الحسابات وإدارة هوية المستخدمين'], ['Cloud Firestore', 'قاعدة بيانات NoSQL تدعم التحديثات الفورية'], ['Cloud Storage for Firebase', 'تخزين الصور والملفات والمحتوى المرفوع'], ['Cloud Functions for Firebase', 'تنفيذ منطق خلفي عند وقوع أحداث أو استدعاء وظائف'], ['Firebase Cloud Messaging (FCM)', 'إرسال إشعارات إلى الأجهزة'], ['Google Analytics for Firebase', 'تحليل استخدام التطبيق والتفاعل معه']] },
            { type: 'quote', text: 'ملاحظة مهمة: Firebase ليس بديلًا كاملًا عن كل خادم Backend في جميع الحالات. قد تحتاج إلى API خاص بك أو Cloud Functions لتنفيذ قواعد العمل والتحقق من الصلاحيات والعمليات الحساسة.' },
            { type: 'paragraph', text: 'المرجع الرسمي: [Firebase Documentation](https://firebase.google.com/docs)' },
            { type: 'heading', text: '2. إنشاء مشروع Firebase' },
            { type: 'list', ordered: true, items: ['افتح [Firebase Console](https://console.firebase.google.com/).', 'سجّل الدخول باستخدام حساب Google.', 'اختر Create a Firebase project أو Add project.', 'أدخل اسمًا للمشروع، مثل `flutter-learning-app`.', 'اتبع خطوات إنشاء المشروع.', 'فعّل Google Analytics إذا كنت تحتاج إلى تحليلات الاستخدام، وإلا يمكنك تركه معطلًا.', 'انتظر حتى يكتمل الإنشاء.'] },
            { type: 'heading', text: 'إضافة التطبيقات إلى المشروع', level: 3 },
            { type: 'paragraph', text: 'مشروع Firebase هو الحاوية التي تجمع الخدمات والإعدادات. أما تطبيقات Android وWeb وiOS فهي تسجيلات منفصلة داخله.' },
            { type: 'paragraph', text: 'على سبيل المثال، يمكن أن يحتوي مشروع Firebase واحد على:' },
            { type: 'list', items: ['تطبيق Android بمعرّف مثل `com.example.learning_platform`.', 'تطبيق Web بمعرّف خاص به.', 'تطبيق iOS بمعرّف Bundle ID خاص به.'] },
            { type: 'paragraph', text: 'لا يلزم إنشاء مشروع Firebase منفصل لكل منصة إذا كانت المنصات تنتمي إلى التطبيق والبيئة نفسيهما.' },
            { type: 'quote', text: 'تنبيه: اسم المشروع ليس هو معرّف المشروع `projectId`، واسم حزمة Android ليس اسم تطبيق Firebase المعروض للمستخدم.' },
            { type: 'heading', text: '3. تثبيت الأدوات المطلوبة' },
            { type: 'paragraph', text: 'نحتاج إلى أداتين مختلفتين، ولكل واحدة وظيفة محددة.' },
            { type: 'heading', text: 'Firebase CLI', level: 3 },
            { type: 'paragraph', text: 'تسجيل الدخول إلى Firebase وإدارة المشاريع والخدمات من سطر الأوامر.' },
            { type: 'paragraph', text: '[التوثيق الرسمي](https://firebase.google.com/docs/cli)' },
            { type: 'heading', text: 'FlutterFire CLI', level: 3 },
            { type: 'paragraph', text: 'تهيئة تطبيق Flutter وإنشاء ملف الإعدادات المناسب للمنصات المحددة.' },
            { type: 'paragraph', text: '[التوثيق الرسمي](https://firebase.google.com/docs/flutter/setup)' },
            { type: 'heading', text: 'الخطوة الأولى: تثبيت Firebase CLI', level: 3 },
            { type: 'paragraph', text: 'تأكد من تثبيت Node.js وnpm، ثم افتح PowerShell أو Terminal ونفّذ:' },
            { type: 'code', language: 'bash', code: 'npm install -g firebase-tools' },
            { type: 'paragraph', text: 'تحقق من التثبيت:' },
            { type: 'code', language: 'bash', code: 'firebase --version' },
            { type: 'paragraph', text: 'سجّل الدخول إلى حساب Google:' },
            { type: 'code', language: 'bash', code: 'firebase login' },
            { type: 'paragraph', text: 'ستفتح نافذة المتصفح لإتمام تسجيل الدخول. بعد نجاح العملية، يمكنك التحقق من الحساب:' },
            { type: 'code', language: 'bash', code: 'firebase projects:list' },
            { type: 'paragraph', text: 'يجب أن تظهر مشاريع Firebase التي يستطيع الحساب الوصول إليها.' },
            { type: 'heading', text: 'الخطوة الثانية: تثبيت FlutterFire CLI', level: 3 },
            { type: 'paragraph', text: 'نفّذ:' },
            { type: 'code', language: 'bash', code: 'dart pub global activate flutterfire_cli' },
            { type: 'paragraph', text: 'ثم تحقق من التثبيت:' },
            { type: 'code', language: 'bash', code: 'flutterfire --version' },
            { type: 'paragraph', text: 'إذا ظهر خطأ بأن الأمر غير معروف، فقد يكون السبب أن مجلد الأدوات غير موجود في متغير `PATH`.' },
            { type: 'heading', text: 'الخطوة الثالثة: إضافة FlutterFire إلى PATH في Windows', level: 3 },
            { type: 'paragraph', text: 'المسار المعتاد لأدوات Dart العالمية هو:' },
            { type: 'code', language: 'powershell', code: '%LOCALAPPDATA%\\Pub\\Cache\\bin' },
            { type: 'paragraph', text: 'يمكنك إضافته إلى `PATH` الخاص بالمستخدم من إعدادات Windows:' },
            { type: 'list', ordered: true, items: ['افتح قائمة Start وابحث عن `Edit environment variables for your account`.', 'افتح متغير `Path` ضمن User variables.', 'اضغط `New`.', 'أضف المسار السابق.', 'احفظ التغييرات وأعد فتح PowerShell أو VS Code.'] },
            { type: 'paragraph', text: 'تحقق مجددًا:' },
            { type: 'code', language: 'powershell', code: 'where.exe flutterfire\nflutterfire --version' },
            { type: 'paragraph', text: 'لا تستخدم صيغة `export PATH=...` في PowerShell؛ فهي تخص Bash وبيئات مشابهة وليست صيغة PowerShell المعتادة.' },
            { type: 'paragraph', text: 'مرجع: [FlutterFire CLI](https://github.com/invertase/flutterfire_cli)' },
            { type: 'heading', text: '4. إنشاء تطبيق Flutter أو استخدام تطبيق موجود' },
            { type: 'paragraph', text: 'إذا لم يكن لديك مشروع:' },
            { type: 'code', language: 'bash', code: 'flutter create learning_platform\ncd learning_platform' },
            { type: 'paragraph', text: 'أما إذا كان لديك تطبيق جاهز، فانتقل إلى مجلده الرئيسي، حيث يوجد الملف `pubspec.yaml`.' },
            { type: 'paragraph', text: 'تحقق من البيئة:' },
            { type: 'code', language: 'bash', code: 'flutter doctor\nflutter --version\ndart --version' },
            { type: 'paragraph', text: 'لا تنشئ مشروعًا جديدًا إذا كنت تعمل بالفعل على مشروعك؛ نفّذ الخطوات التالية داخله.' },
            { type: 'heading', text: '5. إعداد Firebase باستخدام FlutterFire CLI' },
            { type: 'heading', text: 'الخطوة الأولى: تسجيل الدخول والتحقق من المشاريع', level: 3 },
            { type: 'code', language: 'bash', code: 'firebase login\nfirebase projects:list' },
            { type: 'heading', text: 'الخطوة الثانية: تشغيل إعداد المنصات', level: 3 },
            { type: 'paragraph', text: 'من مجلد مشروع Flutter:' },
            { type: 'code', language: 'bash', code: 'flutterfire configure' },
            { type: 'paragraph', text: 'اتبع التعليمات التفاعلية:' },
            { type: 'list', ordered: true, items: ['اختر مشروع Firebase الموجود أو أنشئ مشروعًا جديدًا.', 'اختر المنصات التي تريد دعمها، مثل Android وWeb.', 'تحقق من معرّف الحزمة الخاص بتطبيق Android إذا طُلب منك ذلك.', 'انتظر حتى تنتهي الأداة من الإعداد.'] },
            { type: 'paragraph', text: 'إذا كنت تريد دعم Android وWeb فقط، فلا تحدد iOS أو macOS أو Windows دون حاجة.' },
            { type: 'paragraph', text: 'يمكنك أيضًا تحديد المشروع والمنصات مباشرةً:' },
            { type: 'code', language: 'bash', code: 'flutterfire configure --project=YOUR_FIREBASE_PROJECT_ID --platforms=android,web' },
            { type: 'paragraph', text: 'استبدل `YOUR_FIREBASE_PROJECT_ID` بمعرّف مشروعك الفعلي.' },
            { type: 'heading', text: 'ماذا تفعل الأداة؟', level: 3 },
            { type: 'list', items: ['تربط التطبيقات المحددة بمشروع Firebase.', 'تنشئ تسجيلات التطبيقات غير الموجودة عند الحاجة.', 'تولّد ملف `lib/firebase_options.dart`.', 'تُعدّ ملفات وإعدادات المنصات التي تدعمها الأداة.', 'تضيف بعض إعدادات Gradle المطلوبة تلقائيًا في الحالات التي تحتاج إليها.'] },
            { type: 'paragraph', text: 'التكوين ليس عملية تُنفّذ مرة واحدة فقط؛ أعد تشغيل `flutterfire configure` عند إضافة منصة جديدة أو عند إجراء تغييرات تتطلب تحديث تكوين Firebase.' },
            { type: 'heading', text: '6. تثبيت مكتبة Firebase الأساسية' },
            { type: 'paragraph', text: 'بدلًا من كتابة رقم إصدار ثابت قد يصبح قديمًا، استخدم الأمر التالي:' },
            { type: 'code', language: 'bash', code: 'flutter pub add firebase_core' },
            { type: 'paragraph', text: 'ثم تحقق من الاعتماديات:' },
            { type: 'code', language: 'bash', code: 'flutter pub get' },
            { type: 'paragraph', text: 'ستُضاف المكتبة إلى `pubspec.yaml` بالإصدار المتوافق مع بيئة Flutter وDart لديك.' },
            { type: 'paragraph', text: 'لا تكتب اعتماديات بهذا الشكل غير الصحيح:' },
            { type: 'code', language: 'yaml', code: 'dependencies:\nfirebase_core: ^4.15.0' },
            { type: 'paragraph', text: 'بل يجب أن تكون المسافات البادئة صحيحة، أو الأفضل أن تدع `flutter pub add` يتولى تعديل الملف.' },
            { type: 'paragraph', text: 'إذا كنت تستخدم خدمة أخرى، مثل Firestore أو Authentication، فستحتاج إلى مكتبتها الخاصة أيضًا؛ `firebase_core` وحدها تهيئ الاتصال الأساسي ولا توفر واجهات قواعد البيانات أو تسجيل الدخول.' },
            { type: 'heading', text: '7. تهيئة Firebase في main.dart' },
            { type: 'paragraph', text: 'افتح `lib/main.dart` واستخدم المثال التالي:' },
            { type: 'code', language: 'dart', code: 'import \'package:flutter/material.dart\';\nimport \'package:firebase_core/firebase_core.dart\';\n\nimport \'firebase_options.dart\';\n\nFuture<void> main() async {\n  WidgetsFlutterBinding.ensureInitialized();\n\n  await Firebase.initializeApp(\n    options: DefaultFirebaseOptions.currentPlatform,\n  );\n\n  runApp(const MyApp());\n}\n\nclass MyApp extends StatelessWidget {\n  const MyApp({super.key});\n\n  @override\n  Widget build(BuildContext context) {\n    return MaterialApp(\n      debugShowCheckedModeBanner: false,\n      title: \'Firebase Learning\',\n      theme: ThemeData(\n        colorScheme: ColorScheme.fromSeed(\n          seedColor: Colors.blue,\n        ),\n        useMaterial3: true,\n      ),\n      home: const HomeScreen(),\n    );\n  }\n}\n\nclass HomeScreen extends StatelessWidget {\n  const HomeScreen({super.key});\n\n  @override\n  Widget build(BuildContext context) {\n    return Scaffold(\n      appBar: AppBar(\n        title: const Text(\'Flutter + Firebase\'),\n      ),\n      body: const Center(\n        child: Column(\n          mainAxisSize: MainAxisSize.min,\n          children: [\n            Icon(\n              Icons.cloud_done,\n              size: 64,\n              color: Colors.green,\n            ),\n            SizedBox(height: 16),\n            Text(\n              \'Firebase initialized successfully!\',\n              textAlign: TextAlign.center,\n              style: TextStyle(fontSize: 20),\n            ),\n          ],\n        ),\n      ),\n    );\n  }\n}' },
            { type: 'heading', text: 'شرح الأجزاء المهمة', level: 3 },
            { type: 'list', ordered: true, items: ['**تهيئة الربط:** تضمن تهيئة ربط Flutter عبر `WidgetsFlutterBinding.ensureInitialized()` قبل استدعاء عمليات قد تعتمد على إطار العمل قبل `runApp()`.', '**التهيئة:** تنشئ `Firebase.initializeApp()` تطبيق Firebase وتجهّزه للاستخدام في Dart. يجب انتظار اكتمال التهيئة قبل تشغيل التطبيق إذا كان يعتمد على Firebase منذ البداية.', '**خيارات المنصة:** يختار `DefaultFirebaseOptions.currentPlatform` إعدادات Firebase الخاصة بالمنصة الحالية، مثل Android أو Web.', '**التشغيل:** تشغّل `runApp()` واجهة Flutter بعد اكتمال التهيئة.'] },
            { type: 'paragraph', text: 'ملاحظة: النص الظاهر في الشاشة يثبت أن الواجهة تعمل بعد التهيئة دون استثناء، لكنه ليس اختبارًا مستقلًا لقراءة البيانات أو الكتابة إلى قاعدة بيانات فعلية.' },
            { type: 'heading', text: '8. فهم ملفات تكوين Firebase' },
            { type: 'paragraph', text: '**`lib/firebase_options.dart`:** يحتوي على كائنات `FirebaseOptions` اللازمة لتهيئة Firebase على المنصات التي أعددتها. يُولَّد بواسطة FlutterFire CLI، لذلك لا تعدّل قيمه يدويًا عادةً.' },
            { type: 'paragraph', text: '**`android/app/google-services.json`:** ملف إعدادات Android الذي يمكن أن تستخدمه إضافة Google Services في Gradle.' },
            { type: 'paragraph', text: '**`ios/Runner/GoogleService-Info.plist`:** ملف إعدادات iOS، إذا كنت قد أعددت هذه المنصة.' },
            { type: 'paragraph', text: '**إعدادات Web:** يستخدم تطبيق الويب خيارات Firebase المولّدة في `firebase_options.dart` عند التهيئة.' },
            { type: 'heading', text: 'هل firebase_options.dart ملف سري؟', level: 3 },
            { type: 'paragraph', text: 'ليس بحد ذاته. يحتوي عادةً على معرّفات وإعدادات تعريف التطبيق، ومنها `apiKey` و`projectId` و`appId`. هذه القيم لا تحل محل نظام الصلاحيات.' },
            { type: 'paragraph', text: 'الأمان الحقيقي يعتمد على:' },
            { type: 'list', items: ['إعداد Firestore Security Rules.', 'إعداد Storage Security Rules.', 'تفعيل المصادقة والتحقق من هوية المستخدم عند الحاجة.', 'عدم تضمين مفاتيح الخادم أو بيانات الاعتماد السرية في تطبيق العميل.', 'استخدام App Check عند ملاءمته لتقليل الطلبات غير الموثوقة.'] },
            { type: 'paragraph', text: 'لا تجعل قواعد قاعدة البيانات مفتوحة للجميع لمجرد أن التطبيق متصل بنجاح.' },
            { type: 'paragraph', text: 'المراجع: [Firebase projects and configuration](https://firebase.google.com/docs/projects/learn-more) · [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)' },
            { type: 'heading', text: '9. إعدادات Android وiOS: ما الذي يجب تعديله يدويًا؟' },
            { type: 'paragraph', text: 'في الدرس القديم، كان هناك طلب لإضافة Google Services plugin يدويًا إلى ملفات Gradle. هذا ليس الإجراء الافتراضي الذي ينبغي اتباعه عند استخدام FlutterFire CLI.' },
            { type: 'heading', text: 'Android', level: 3 },
            { type: 'paragraph', text: 'في المسار المعتاد، ابدأ بتشغيل:' },
            { type: 'code', language: 'bash', code: 'flutterfire configure' },
            { type: 'paragraph', text: 'ستتولى الأداة إعداد تكوين Android المطلوب. لا تضف تلقائيًا هذه الأسطر القديمة:' },
            { type: 'code', language: 'gradle', code: 'classpath \'com.google.gms:google-services:4.4.0\'\napply plugin: \'com.google.gms.google-services\'' },
            { type: 'paragraph', text: 'إلى أي ملف قبل فحص بنية المشروع وإصدارات Gradle المستخدمة. تختلف بنية المشاريع الحديثة بحسب استخدام `build.gradle` أو `build.gradle.kts` وطريقة تطبيق الإضافات.' },
            { type: 'paragraph', text: 'إذا واجهت خطأ في Google Services plugin، راجع إعدادات المشروع الفعلية ثم اتبع [دليل إعداد Firebase الرسمي لـ Flutter](https://firebase.google.com/docs/flutter/setup).' },
            { type: 'heading', text: 'iOS', level: 3 },
            { type: 'paragraph', text: 'إذا كنت تستهدف iOS، فستحتاج إلى إعداد Xcode وبيئة macOS المناسبة للبناء. لا يكفي تعديل `Podfile` وحده لربط Firebase.' },
            { type: 'paragraph', text: 'لا تضف إصدار iOS عشوائيًا إلى `Podfile`؛ تحقق من متطلبات إصدار FlutterFire الذي تستخدمه وإعدادات المشروع. بعد التكوين، اتبع تعليمات البناء الخاصة بـ iOS في [التوثيق الرسمي](https://firebase.google.com/docs/flutter/setup).' },
            { type: 'paragraph', text: 'إذا كان مشروعك يستهدف Android وWeb فقط، يمكنك تجاوز قسم iOS بالكامل.' },
            { type: 'heading', text: '10. اختبار تشغيل التطبيق' },
            { type: 'paragraph', text: 'من مجلد المشروع، نفّذ:' },
            { type: 'code', language: 'bash', code: 'flutter clean\nflutter pub get\nflutter run' },
            { type: 'paragraph', text: 'إذا كنت تريد تشغيل نسخة Web:' },
            { type: 'code', language: 'bash', code: 'flutter run -d chrome' },
            { type: 'paragraph', text: 'أما Android، فتحقق أولًا من الأجهزة المتاحة:' },
            { type: 'code', language: 'bash', code: 'flutter devices' },
            { type: 'paragraph', text: 'ثم شغّل التطبيق على الجهاز أو المحاكي المطلوب.' },
            { type: 'heading', text: 'كيف نعرف أن التهيئة نجحت؟', level: 3 },
            { type: 'list', items: ['يبدأ التطبيق دون ظهور استثناء أثناء `Firebase.initializeApp()`.', 'لا يظهر خطأ يشير إلى غياب `firebase_options.dart`.', 'تعمل المنصة المستهدفة باستخدام خيارات Firebase المناسبة لها.'] },
            { type: 'paragraph', text: 'لكن هذا لا يثبت وحده أن المصادقة أو Firestore أو Storage تعمل؛ يجب اختبار كل خدمة بعد إضافتها.' },
            { type: 'heading', text: '11. إضافة خدمة Firebase لاحقًا' },
            { type: 'paragraph', text: 'بعد نجاح الربط الأساسي، يمكنك إضافة الخدمات حسب احتياجات التطبيق.' },
            { type: 'table', headers: ['الخدمة', 'أمر التثبيت'], rows: [['Authentication', '`flutter pub add firebase_auth`'], ['Cloud Firestore', '`flutter pub add cloud_firestore`'], ['Cloud Storage', '`flutter pub add firebase_storage`'], ['Cloud Messaging', '`flutter pub add firebase_messaging`']] },
            { type: 'paragraph', text: 'بعد إضافة المكتبة المناسبة، شغّل:' },
            { type: 'code', language: 'bash', code: 'flutterfire configure' },
            { type: 'paragraph', text: 'ثم أعد بناء التطبيق:' },
            { type: 'code', language: 'bash', code: 'flutter run' },
            { type: 'paragraph', text: 'قد تتطلب بعض الخدمات إعدادات إضافية في Firebase Console أو المنصة المستهدفة، مثل تفعيل مزوّد تسجيل الدخول أو إعداد الإشعارات.' },
            { type: 'heading', text: '12. الأخطاء الشائعة وحلولها' },
            { type: 'table', headers: ['الخطأ', 'السبب المحتمل', 'الحل'], rows: [['`flutterfire is not recognized`', 'مسار Dart غير مضاف إلى `PATH`', 'أضف `%LOCALAPPDATA%\\Pub\\Cache\\bin` وأعد فتح الطرفية'], ['`firebase is not recognized`', 'Firebase CLI غير مثبت أو غير متاح في `PATH`', 'أعد تثبيته باستخدام npm'], ["`No Firebase App '[DEFAULT]' has been created`", 'استخدام خدمة Firebase قبل التهيئة', 'استدعِ `Firebase.initializeApp()` وانتظر اكتمالها'], ['`Target file firebase_options.dart not found`', 'الملف غير موجود في `lib/` أو مسار الاستيراد خاطئ', 'شغّل `flutterfire configure` وتحقق من مسار الملف'], ['`No matching client found for package name`', 'اختلاف معرّف حزمة Android عن المسجل في Firebase', 'طابق `applicationId` مع التطبيق المسجل في Firebase'], ['`Permission denied` عند استخدام Firestore', 'قواعد الأمان تمنع العملية أو المستخدم غير مخوّل', 'افحص Security Rules وحالة المصادقة'], ['فشل بناء Android بعد التكوين', 'تعارض في Gradle أو إصدار Java أو الإضافات', 'افحص رسالة الخطأ الأصلية وإصدارات الأدوات بدل إضافة إعدادات عشوائية']] },
            { type: 'heading', text: '13. تمرين تطبيقي للطلاب' },
            { type: 'paragraph', text: 'المطلوب: ربط تطبيق Flutter بمشروع Firebase' },
            { type: 'paragraph', text: 'أنجز الخطوات التالية ثم تحقق من كل واحدة قبل الانتقال إلى التالية.' },
            { type: 'paragraph', text: '**التقدم: 0 / 8**' },
            { type: 'list', items: ['إنشاء مشروع Firebase أو اختيار مشروع موجود', 'تثبيت Firebase CLI وتسجيل الدخول', 'تثبيت FlutterFire CLI والتحقق من PATH', 'تهيئة Android وWeb باستخدام flutterfire configure', 'إضافة firebase_core', 'تهيئة Firebase في main.dart', 'تشغيل التطبيق على Android أو Web', 'التأكد من عدم وجود أخطاء تهيئة في سجل التشغيل'] },
            { type: 'heading', text: 'أسئلة التقييم', level: 3 },
            { type: 'list', ordered: true, items: ['ما الفرق بين Firebase CLI وFlutterFire CLI؟', 'لماذا نستخدم `WidgetsFlutterBinding.ensureInitialized()` قبل تهيئة Firebase؟', 'ما وظيفة `DefaultFirebaseOptions.currentPlatform`؟', 'هل وجود `firebase_options.dart` يعني أن قاعدة البيانات آمنة؟ ولماذا؟', 'متى نحتاج إلى إعادة تشغيل `flutterfire configure`؟', 'ما الفرق بين `firebase_core` و`cloud_firestore`؟'] },
            { type: 'heading', text: 'المراجع الرسمية' },
            { type: 'list', items: ['[إعداد Firebase في Flutter](https://firebase.google.com/docs/flutter/setup)', '[Firebase CLI](https://firebase.google.com/docs/cli)', '[FlutterFire CLI — مستودع الأداة](https://github.com/invertase/flutterfire_cli)', '[حزم FlutterFire](https://github.com/firebase/flutterfire)', '[قواعد أمان Cloud Firestore](https://firebase.google.com/docs/firestore/security/get-started)'] },
            { type: 'paragraph', text: 'النتيجة التعليمية: بعد إكمال هذا الدرس، يصبح التطبيق مهيأً لاستخدام Firebase على المنصات التي اخترتها. الخطوة التالية هي تطبيق خدمة حقيقية، مثل تسجيل المستخدمين باستخدام Firebase Authentication أو حفظ المهام وقراءتها من Cloud Firestore.' }
        ]
    }
]

export const projects: Project[] = [
    {
        id: 1,
        title: 'Tamer Academy',
        category: 'best',
        subtitle: 'Programming Learning App (Flutter, Dart, Firebase)',
        description: 'Tamer Academy is a Flutter educational application (v1.0.0+) that teaches programming, available on both Android and web via Firebase Hosting. Built entirely with Dart and Flutter, it delivers coding lessons with syntax-highlighted code display, custom Google Fonts typography, and offline-friendly preferences — directly extending the mentor mission into a product.\n\nThe app integrates Firebase Authentication with Google Sign-In, Cloud Firestore and Firebase Storage for lesson content, plus Supabase as an additional backend. State is managed with Provider, content can be embedded through WebView, and flutter_localizations with intl provide a localized experience.\n\nWith its own brand identity, versioned releases up to build 57, APK build automation, and Firestore security rules, Tamer Academy demonstrates complete mobile product ownership — from curriculum-style content delivery to authentication, cloud backends, and multi-platform deployment on Android and the web.',
        tags: [
            { id: 61, name: 'Flutter' },
            { id: 62, name: 'Dart' },
            { id: 63, name: 'Firebase' },
            { id: 64, name: 'Supabase' }
        ],
        github_url: 'https://github.com/Tamer7459/tamer-academy',
        live_url: 'https://tamer-academy.web.app',
        image_url: '/projects/tamer-academy.png',
        media: [
            { type: 'image', url: '/projects/tamer-academy.png' }
        ],
        status: 'live',
        featured: true
    },
    {
        id: 2,
        title: 'Sport avec Boubker',
        category: 'best',
        subtitle: 'Gym Management Platform (Next.js, Zustand, Recharts)',
        description: 'Sport avec Boubker is a gym management platform built with Next.js 14 for a sports hall, delivered in French with full internationalization. It centralizes member management, subscriptions, and daily gym operations in a modern responsive interface with dark/light theme support.\n\nThe front-end is built with React 18, TypeScript, and Tailwind CSS, using next-intl for translations, next-themes for theming, Zustand for client-side state management, and Lucide icons throughout. Recharts powers analytics dashboards giving gym owners insight into memberships and activity, while a dedicated TypeScript back-end exposes the API consumed by the app.\n\nDeployed on Vercel with a clean modular architecture (app router, components, store, types), the project demonstrates production SaaS development for local businesses — multilingual UX, real-time dashboards, and scalable state management in a real client-facing product.',
        tags: [
            { id: 57, name: 'Next.js' },
            { id: 58, name: 'TypeScript' },
            { id: 59, name: 'Tailwind CSS' },
            { id: 60, name: 'Zustand' }
        ],
        github_url: 'https://github.com/Tamer7459/Sport-avec-Boubker-frontend',
        live_url: 'https://sport-avec-boubker-frontend.vercel.app',
        image_url: '/projects/sport-avec-boubker.png',
        media: [
            { type: 'image', url: '/projects/sport-avec-boubker.png' }
        ],
        status: 'live',
        featured: true
    },
    {
        id: 3,
        title: 'GFR Platform',
        category: 'team',
        subtitle: 'Global Academic Network for Researchers (Team Project · Django)',
        description: 'GFR Platform (Global Forum for Researchers) is a team-built academic social network and research management platform developed with Django. It gives every researcher a single academic identity combining profile, publications, projects, and peer reviews — with live community stats such as 12,480 researchers, 312 institutions, and 24 journals.\n\nThe platform covers the full publishing workflow: manuscript submission to peer-reviewed open-access journals with double-blind review tracking in real time, research project collaboration with team task management, and year-round conferences and workshops. The marketing site presents the journey in three steps — create your profile, submit your work, collaborate and publish.\n\nBuilt collaboratively as a team using Django\'s MVT architecture with authentication, registration, and role-based flows, and deployed on Render. The project demonstrates large-scale product development, code collaboration through forks and pull requests, and shipping a production academic platform as a team.',
        tags: [
            { id: 51, name: 'Django' },
            { id: 52, name: 'Python' },
            { id: 53, name: 'JavaScript' }
        ],
        github_url: 'https://github.com/dakirBLM/gfr-platform',
        live_url: 'https://gfr-platform.onrender.com',
        image_url: '/projects/gfr-platform.png',
        media: [
            { type: 'image', url: '/projects/gfr-platform.png' }
        ],
        status: 'live',
        featured: true
    },
    {
        id: 4,
        title: 'NERO',
        category: 'team',
        subtitle: 'Rehabilitation Care Marketplace (Team Project · Django)',
        description: 'NERO is a team-built bilingual (Arabic/English) rehabilitation-care platform developed with Django. It connects patients with the right rehabilitation clinics — patients describe their case and get matched to a suitable clinic, then share medical records, chat, and book appointments, all in one friendly place.\n\nThe platform serves two sides: a patient journey with smart clinic recommendations, request tracking, and ongoing contact, and a clinic portal where clinics register, build their page with treatments, photos, and videos, collect reviews, and receive bookings. A friendly AI assistant called King George guides visitors to the right place, whether they are patients looking for care or clinics getting set up.\n\nDeveloped collaboratively as a team with Django templates, authentication flows, and static asset management, and deployed on Render. The project showcases product thinking for healthcare marketplaces, bilingual UX, AI-assisted onboarding, and real team-based development workflows.',
        tags: [
            { id: 54, name: 'Django' },
            { id: 55, name: 'Python' },
            { id: 56, name: 'JavaScript' }
        ],
        github_url: 'https://github.com/dakirBLM/Nero',
        live_url: 'https://nero-69la.onrender.com',
        image_url: '/projects/nero.png',
        media: [
            { type: 'image', url: '/projects/nero.png' }
        ],
        status: 'live',
        featured: true
    },
    {
        id: 5,
        title: 'INVOICEPRO',
        category: 'best',
        subtitle: 'Smart Invoicing SaaS (Next.js, TypeScript, Tailwind CSS)',
        description: 'Invoice Pro is a professional SaaS invoicing application built with Next.js that allows users to create, customize, and send professional invoices instantly. The platform features smart invoicing with auto-calculations, client management, real-time analytics for revenue tracking, multi-currency support (USD, EUR, DZD), PDF export, and secure cloud storage. It offers a responsive interface with multiple pricing tiers (Free, Professional, Business) and supports WhatsApp sharing of invoices.\n\nThe front-end is built with Next.js, TypeScript, and Tailwind CSS, delivering a modern, accessible, and responsive user experience with features such as form validation, dark/light mode, and internationalization. The application follows a clean component architecture with reusable UI components, client-side state management, and a well-structured routing system.\n\nOverall, this project demonstrates full-stack SaaS application development, covering authentication, payment integration, PDF generation, multi-currency support, and responsive UI design. It serves as a practical solution for businesses of all sizes looking to streamline their billing process.',
        tags: [
            { id: 46, name: 'Next.js' },
            { id: 47, name: 'TypeScript' },
            { id: 48, name: 'Tailwind CSS' },
            { id: 49, name: 'Prisma' },
            { id: 50, name: 'PostgreSQL' }
        ],
        github_url: 'https://github.com/Tamer7459/INVOICEPRO-frontend',
        live_url: 'https://invoicepro-frontend-rho.vercel.app/',
        image_url: '/projects/INVOICEPRO.png',
        media: [
            { type: 'image', url: '/projects/INVOICEPRO.png' },
            { type: 'image', url: '/projects/invoicepro-create.png' }
        ],
        status: 'live',
        featured: true
    },
    {
        id: 6,
        title: 'Modern Healthcare Management System',
        category: 'best',
        subtitle: 'CareFlow - Hospital Management System (Next.js, Radix UI, Zustand)',
        description: 'A comprehensive hospital management platform built with Next.js called CareFlow, designed to streamline healthcare operations through a modern, accessible, and responsive interface.\n\nThe system features a complete patient management workflow including appointment booking and scheduling with real-time availability tracking, secure medical records storage with patient history and vital signs management, and dedicated portals for patients, doctors, and administrators with role-based access control.\n\nThe front-end is built with React 19, Next.js, TypeScript, and Tailwind CSS, utilizing Radix UI primitives for accessible components, React Hook Form with resolvers for form validation, Zustand for state management, and Axios for API communication. The platform includes interactive health data analytics with Recharts, toast notifications via Sonner, theme switching with next-themes, and a comprehensive icon system using Lucide React.\n\nOverall, this project demonstrates full-stack healthcare application development, covering complex state management, form validation, role-based authentication, responsive UI design, and data visualization - making it a strong portfolio piece for modern web application engineering.',
        tags: [
            { id: 1, name: 'Next.js' },
            { id: 2, name: 'TypeScript' },
            { id: 3, name: 'Tailwind CSS' },
            { id: 4, name: 'Radix UI' },
            { id: 5, name: 'Zustand' }
        ],
        github_url: 'https://github.com/Tamer7459/Modern-Healthcare-Management-System-frontend',
        live_url: 'https://modern-healthcare-management-system.vercel.app/',
        image_url: '/projects/modern-healthcare-management-system.png',
        media: [
            { type: 'image', url: '/projects/modern-healthcare-management-system.png' },
            { type: 'image', url: '/projects/healthcare-login.png' },
            { type: 'image', url: '/projects/healthcare-register.png' }
        ],
        status: 'live',
        featured: true
    },
    {
        id: 7,
        title: 'Le Bon Cion Nouri Mila',
        category: 'best',
        subtitle: 'E-Commerce Storefront with Admin Dashboard (Upstash Redis)',
        description: 'A modern e-commerce platform built with Next.js for Le Bon Cion Nouri Mila, a retail store in Mila, Algeria. The application features a full product catalog with search and category filtering, detailed product pages with images and pricing, an admin dashboard for inventory and order management, and a location-aware contact section. The front-end delivers a responsive shopping experience with smooth animations using Framer Motion, while the back-end leverages Upstash Redis for fast data storage and retrieval. The platform includes sales analytics via Recharts, multi-language support (French), Facebook integration, and a secure admin panel for managing products and orders.',
        tags: [
            { id: 6, name: 'Next.js' },
            { id: 7, name: 'TypeScript' },
            { id: 8, name: 'Tailwind CSS' },
            { id: 9, name: 'Redis' }
        ],
        github_url: 'https://github.com/Tamer7459/le-bon-cion-nouri-frontend',
        live_url: 'https://le-bon-cion-nouri-frontend.vercel.app',
        image_url: '/projects/Le-Bon-Cion.png',
        media: [
            { type: 'image', url: '/projects/Le-Bon-Cion.png' }
        ],
        status: 'live',
        featured: true
    },
    {
        id: 8,
        title: 'GFR Project',
        category: 'best',
        subtitle: 'Full-Stack Web Application (1st Place Hackathon Winner)',
        description: 'The GFR Project is a full-stack web application composed of a modern React front-end and a Laravel back-end API, designed to simulate a real production-level system with clear separation between presentation layer and business logic.\n\nThe front-end is responsible for rendering a responsive and interactive user interface, managing client-side state, and consuming RESTful APIs. It focuses on performance, modular components, and a clean user experience.\n\nThe back-end is built using Laravel and provides a structured API layer that handles authentication, authorization, role-based access control (RBAC), and database operations. It implements secure data handling, migrations, seeders, and follows RESTful design principles.\n\nThe system is configured for scalable deployment using Docker and supports production environments through tools such as Nginx, Vercel (front-end), and Render (back-end). Environment variables are used to separate development and production configurations, ensuring flexibility and security.\n\nOverall, the project demonstrates full-stack development skills, including API design, front-end integration, database management, and deployment workflows, making it suitable as a portfolio-level application for demonstrating real-world engineering practices.',
        tags: [
            { id: 10, name: 'React' },
            { id: 11, name: 'Laravel' },
            { id: 12, name: 'RESTful APIs' }
        ],
        github_url: 'https://github.com/Tamer7459/gfr-front-end',
        live_url: 'https://gfr-front-end.vercel.app',
        image_url: '/projects/GFR.png',
        media: [
            { type: 'image', url: '/projects/GFR.png' }
        ],
        status: 'live',
        featured: true
    },
    {
        id: 9,
        title: 'LibraSys',
        category: 'best',
        subtitle: 'Library Management System Built with Django',
        description: 'LibraSys is a web-based Library Management System developed using Django. It enables efficient management of books, categories, and users through a structured backend and clean interface. The project focuses on backend development, database management, search functionality, and Django\'s MVT architecture while providing an admin dashboard for easy library operations.',
        tags: [
            { id: 13, name: 'JS' },
            { id: 14, name: 'HTML' },
            { id: 15, name: 'CSS' },
            { id: 16, name: 'Bootstrap 5' },
            { id: 17, name: 'Django' }
        ],
        github_url: 'https://github.com/Tamer7459/LibraSys',
        live_url: 'https://librasys-0vvb.onrender.com',
        image_url: '/projects/librasys.png',
        media: [
            { type: 'image', url: '/projects/librasys.png' }
        ],
        status: 'live',
        featured: true
    },
    {
        id: 10,
        title: 'XO Game',
        category: 'simple',
        subtitle: 'Tic Tac Toe - DOM Manipulation & Game State Logic',
        description: 'A lightweight front-end project that implements the Tic Tac Toe game using vanilla JavaScript. The application focuses on state management, event handling, and dynamic UI updates, making it a solid example for beginners learning core web development concepts.',
        tags: [
            { id: 18, name: 'JS' },
            { id: 19, name: 'HTML' },
            { id: 20, name: 'CSS' },
            { id: 21, name: 'Bootstrap 5' }
        ],
        github_url: 'https://github.com/Tamer7459/XOGame',
        live_url: 'https://xo-game-smoky-theta.vercel.app',
        image_url: '/projects/xo_game.png',
        media: [
            { type: 'image', url: '/projects/xo_game.png' }
        ],
        status: 'live',
        featured: false
    },
    {
        id: 11,
        title: 'CURDS',
        category: 'simple',
        subtitle: 'CRUD Web Application (Create, Read, Update, Delete)',
        description: 'The CURDS project is a simple and lightweight web application built using HTML, CSS, and JavaScript, designed to demonstrate the fundamental operations of data management in web development.\n\nThe system allows users to create, display, update, and delete records dynamically in the browser without requiring a backend server. All data is handled on the client side using JavaScript, making it a perfect example for understanding DOM manipulation and state handling in vanilla JavaScript.\n\nThe interface is designed to be clean and user-friendly, ensuring smooth interaction and fast performance. This project is mainly focused on strengthening core front-end development skills and understanding how CRUD logic works in real-world applications.\n\n⚙️ Key Concepts Demonstrated:\nDOM manipulation\nEvent handling in JavaScript\nDynamic UI updates\nLocal state management (client-side)\nCRUD logic implementation',
        tags: [
            { id: 22, name: 'JS' },
            { id: 23, name: 'HTML' },
            { id: 24, name: 'CSS' }
        ],
        github_url: 'https://github.com/Tamer7459/CURDS',
        live_url: 'https://curds-phi.vercel.app/',
        image_url: '/projects/CRUDS.png',
        media: [
            { type: 'image', url: '/projects/CRUDS.png' }
        ],
        status: 'live',
        featured: true
    },
    {
        id: 12,
        title: 'Drag-and-Drop',
        category: 'simple',
        subtitle: 'Interactive Drag and Drop Interface using JavaScript',
        description: 'A lightweight front-end project that demonstrates drag-and-drop functionality using vanilla JavaScript. The application allows users to move elements dynamically between containers through mouse interactions, showcasing core concepts such as event handling, DOM manipulation, and the HTML5 Drag and Drop API. It is designed as a practical example for understanding interactive UI behavior without relying on external libraries or frameworks.',
        tags: [
            { id: 25, name: 'JS' },
            { id: 26, name: 'HTML' },
            { id: 27, name: 'CSS' }
        ],
        github_url: 'https://github.com/Tamer7459/Drag-and-Drop',
        live_url: 'https://drag-and-drop-tau-three.vercel.app',
        image_url: '/projects/Drag-and-Drop.png',
        media: [
            { type: 'image', url: '/projects/Drag-and-Drop.png' }
        ],
        status: 'live',
        featured: true
    },
    {
        id: 13,
        title: 'Make-a-creative-landing-page',
        category: 'simple',
        subtitle: 'Modern UI Landing Page for Web Projects',
        description: 'A clean, responsive, and interactive landing page built with HTML, CSS, and JavaScript, designed to deliver an engaging user experience and professional visual presentation.',
        tags: [
            { id: 28, name: 'JS' },
            { id: 29, name: 'HTML' },
            { id: 30, name: 'CSS' }
        ],
        github_url: 'https://github.com/Tamer7459/Make-a-creative-landing-page',
        live_url: 'https://drag-and-drop-rmk3.vercel.app',
        image_url: '/projects/Make-a-creative-landing-page_.png',
        media: [
            { type: 'image', url: '/projects/Make-a-creative-landing-page_.png' }
        ],
        status: 'live',
        featured: true
    },
    {
        id: 14,
        title: 'Calculator',
        category: 'simple',
        subtitle: 'Simple, Responsive & Interactive Web Calculator',
        description: 'A basic yet functional calculator built using HTML, CSS, and JavaScript, allowing users to perform standard arithmetic operations with a clean and user-friendly interface.',
        tags: [
            { id: 31, name: 'JS' },
            { id: 32, name: 'HTML' },
            { id: 33, name: 'CSS' }
        ],
        github_url: 'https://github.com/Tamer7459/calculator',
        live_url: 'https://calculator-omega-woad-27.vercel.app',
        image_url: '/projects/calculator.png',
        media: [
            { type: 'image', url: '/projects/calculator.png' }
        ],
        status: 'live',
        featured: true
    },
    {
        id: 15,
        title: 'Make-a-Scrolling-Website',
        category: 'simple',
        subtitle: 'Smooth Scrolling, Modern UI & Interactive Web Experience',
        description: 'A modern scrolling website built with HTML, CSS, and JavaScript, featuring smooth navigation between sections and an engaging user experience.',
        tags: [
            { id: 34, name: 'JS' },
            { id: 35, name: 'HTML' },
            { id: 36, name: 'CSS' }
        ],
        github_url: 'https://github.com/Tamer7459/Make-a-Scrolling-Website',
        live_url: 'https://make-a-scrolling-website.vercel.app',
        image_url: '/projects/make-a-scrolling-website.png',
        media: [
            { type: 'image', url: '/projects/make-a-scrolling-website.png' }
        ],
        status: 'live',
        featured: true
    },
    {
        id: 16,
        title: 'Make-a-Image-Edito',
        category: 'simple',
        subtitle: 'Simple, Fast & Interactive Image Editing Tool',
        description: 'A lightweight web-based image editor built with HTML, CSS, and JavaScript that allows users to apply basic filters and adjustments to images directly in the browser.',
        tags: [
            { id: 37, name: 'JS' },
            { id: 38, name: 'HTML' },
            { id: 39, name: 'CSS' }
        ],
        github_url: 'https://github.com/Tamer7459/make-a-image-edito',
        live_url: 'https://make-a-image-edito.vercel.app',
        image_url: '/projects/make-a-image-edito.png',
        media: [
            { type: 'image', url: '/projects/make-a-image-edito.png' }
        ],
        status: 'live',
        featured: true
    },
    {
        id: 17,
        title: 'Todo List App',
        category: 'simple',
        subtitle: 'Simple, Efficient & Interactive Task Management Application',
        description: 'A modern Todo List web application built with React that allows users to create, manage, and track daily tasks with a clean and responsive user interface.',
        tags: [
            { id: 40, name: 'React' },
            { id: 41, name: 'Node JS' }
        ],
        github_url: 'https://github.com/Tamer7459/Todo-List',
        live_url: 'https://tamer7459.github.io/Todo-List/',
        image_url: '/projects/My_Todo_list__YPxlP3A.png',
        media: [
            { type: 'image', url: '/projects/My_Todo_list__YPxlP3A.png' }
        ],
        status: 'live',
        featured: true
    },
    {
        id: 18,
        title: 'Prayer Times App',
        category: 'simple',
        subtitle: 'Accurate, Simple & Real-Time Prayer Time Tracker',
        description: 'A web application that displays daily Islamic prayer times based on the user\'s location using API integration, built with a clean and responsive interface.',
        tags: [
            { id: 42, name: 'JS' },
            { id: 43, name: 'HTML' },
            { id: 44, name: 'CSS' },
            { id: 45, name: 'Node JS' }
        ],
        github_url: 'https://github.com/Tamer7459/Prayer-Times',
        live_url: 'https://todo-list-k9d3.vercel.app',
        image_url: '/projects/Prayer-Times.png',
        media: [
            { type: 'image', url: '/projects/Prayer-Times.png' }
        ],
        status: 'live',
        featured: true
    }
]
