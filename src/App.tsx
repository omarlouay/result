import { FormEvent, useEffect, useRef, useState } from 'react'

type Grade = {
  subject: string
  rating: string
}

type StudentRecord = {
  examNumber: string
  fullName: string
  university: string
  stage: string
  grades: Grade[]
  finalResult: string
}

const DEMO_RECORD: StudentRecord = {
  examNumber: '200325415043',
  fullName: 'عثمان خالد حماد فرحان',
  university: 'جامعة دجلة',
  stage: 'الرابعة',
  grades: [
    { subject: 'الجراحة العامة', rating: 'جيد جداً' },
    { subject: 'تقويم الأسنان', rating: 'جيد' },
    { subject: 'جراحة الفم', rating: 'ضعيف' },
    { subject: 'أمراض الفم', rating: 'مقبول' },
    { subject: 'أمراض اللثة', rating: 'ضعيف' },
    { subject: 'طب أسنان الأطفال', rating: 'جيد جداً' },
    { subject: 'صناعة الأسنان', rating: 'ضعيف' },
    { subject: 'معالجة الأسنان', rating: 'امتياز' },
    { subject: 'طب عام', rating: 'متوسط' },
  ],
  finalResult: 'راسب',
}

const ratingStyles: Record<string, string> = {
  امتياز: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
  'جيد جداً': 'bg-sky-50 text-sky-800 ring-sky-200',
  جيد: 'bg-blue-50 text-blue-800 ring-blue-200',
  متوسط: 'bg-amber-50 text-amber-800 ring-amber-200',
  مقبول: 'bg-orange-50 text-orange-800 ring-orange-200',
  ضعيف: 'bg-red-50 text-red-700 ring-red-200',
}

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" strokeLinecap="round" />
    </svg>
  )
}

function AcademicMark() {
  return (
    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/20 sm:h-14 sm:w-14">
      <svg aria-hidden="true" viewBox="0 0 28 28" fill="none" className="h-7 w-7 text-sky-200">
        <path d="M4 9.5 14 5l10 4.5L14 14 4 9.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M8 11.5V17c3.2 2.7 8.8 2.7 12 0v-5.5M24 10v7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

function App() {
  const [examNumber, setExamNumber] = useState('')
  const [error, setError] = useState('')
  const [record, setRecord] = useState<StudentRecord | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const resultRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (record) {
      window.setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
    }
  }, [record])

  const handleInput = (value: string) => {
    const digitsOnly = value.replace(/\D/g, '').slice(0, 12)
    setExamNumber(digitsOnly)
    setError('')
    if (record) setRecord(null)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!/^\d{12}$/.test(examNumber)) {
      setRecord(null)
      setError('يرجى إدخال رقم امتحاني مكوّن من 12 رقماً تماماً.')
      return
    }

    if (examNumber !== DEMO_RECORD.examNumber) {
      setRecord(null)
      setError('لا توجد نتيجة تجريبية مطابقة لهذا الرقم.')
      return
    }

    setError('')
    setRecord(DEMO_RECORD)
  }

  const resetSearch = () => {
    setExamNumber('')
    setError('')
    setRecord(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    window.setTimeout(() => inputRef.current?.focus(), 350)
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f4f7fb] text-slate-800">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_15%,rgba(14,165,233,0.09),transparent_26%),radial-gradient(circle_at_88%_80%,rgba(30,64,175,0.07),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.025] [background-image:linear-gradient(#0f2a44_1px,transparent_1px),linear-gradient(90deg,#0f2a44_1px,transparent_1px)] [background-size:32px_32px]" />

      <header className="relative overflow-hidden bg-[#102a43] text-white shadow-lg">
        <div className="absolute inset-y-0 left-0 w-1/2 bg-[radial-gradient(circle_at_left,rgba(56,189,248,0.2),transparent_62%)]" />
        <div className="relative mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-6 sm:gap-4 sm:px-8 sm:py-7">
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <AcademicMark />
            <div>
              <h1 className="whitespace-nowrap text-lg font-extrabold tracking-tight sm:text-2xl">جامعة دجلة</h1>
              <p className="mt-0.5 text-sm font-medium text-sky-100 sm:text-base">نظام عرض النتائج</p>
            </div>
          </div>
          <span className="max-w-[112px] shrink-0 rounded-full bg-amber-300/10 px-2.5 py-1.5 text-center text-[10px] font-bold leading-4 text-amber-200 ring-1 ring-inset ring-amber-200/25 sm:max-w-none sm:px-3 sm:text-xs">
            نموذج تجريبي غير رسمي
          </span>
        </div>
      </header>

      <main className="relative mx-auto w-full max-w-4xl px-4 py-10 sm:px-8 sm:py-14">
        <section className="mx-auto max-w-2xl text-center" aria-labelledby="page-heading">
          <p className="mb-2 text-sm font-bold text-blue-700">بوابة الطلبة التجريبية</p>
          <h2 id="page-heading" className="text-2xl font-extrabold tracking-tight text-[#102a43] sm:text-3xl">
            الاستعلام عن نتيجة الطالب
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
            أدخل الرقم الامتحاني المكوّن من 12 رقماً للاطلاع على السجل التجريبي.
          </p>
        </section>

        <section className="mx-auto mt-7 max-w-2xl rounded-3xl border border-white bg-white/95 p-5 shadow-card backdrop-blur sm:p-8" aria-label="نموذج البحث">
          <form onSubmit={handleSubmit} noValidate>
            <label htmlFor="exam-number" className="mb-2.5 block text-sm font-bold text-slate-700">
              الرقم الامتحاني
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  id="exam-number"
                  name="examNumber"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]{12}"
                  maxLength={12}
                  autoComplete="off"
                  spellCheck={false}
                  value={examNumber}
                  onChange={(event) => handleInput(event.target.value)}
                  aria-describedby={error ? 'search-message' : 'exam-hint'}
                  aria-invalid={Boolean(error)}
                  placeholder="مثال: 200325415043"
                  className={`h-14 w-full rounded-xl border bg-slate-50 px-4 text-left font-semibold tracking-[0.15em] text-slate-900 outline-none transition-all placeholder:text-right placeholder:font-normal placeholder:tracking-normal placeholder:text-slate-400 focus:bg-white focus:ring-4 ${
                    error
                      ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                      : 'border-slate-200 focus:border-blue-500 focus:ring-blue-100'
                  }`}
                  dir="ltr"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400" aria-hidden="true">
                  {examNumber.length}/12
                </span>
              </div>
              <button
                type="submit"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-blue-700 px-7 text-sm font-bold text-white shadow-button transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200 active:translate-y-0"
              >
                <SearchIcon />
                عرض النتيجة
              </button>
            </div>

            <div className="mt-3 min-h-7">
              {error ? (
                <p id="search-message" role="alert" className="flex items-start gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold leading-6 text-red-700">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                  {error}
                </p>
              ) : (
                <p id="exam-hint" className="text-xs leading-6 text-slate-500">
                  تتم المطابقة محلياً داخل متصفحك، ولا يُحفظ رقم البحث أو يُرسل إلى أي جهة.
                </p>
              )}
            </div>
          </form>
        </section>

        {record && (
          <section ref={resultRef} className="result-enter mx-auto mt-8 scroll-mt-5 overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-card" aria-labelledby="result-heading">
            <div className="border-b border-slate-100 bg-gradient-to-l from-[#102a43] to-[#163f63] px-5 py-6 text-white sm:px-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-bold text-sky-200">السجل الأكاديمي التجريبي</p>
                  <h3 id="result-heading" className="mt-1.5 text-xl font-extrabold sm:text-2xl">{record.fullName}</h3>
                </div>
                <span className="w-fit rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-white ring-1 ring-inset ring-white/20">
                  المرحلة {record.stage}
                </span>
              </div>
            </div>

            <div className="grid gap-px bg-slate-200 sm:grid-cols-3">
              <div className="bg-white px-5 py-4 sm:px-6">
                <p className="text-xs font-semibold text-slate-500">اسم الطالب</p>
                <p className="mt-1 text-sm font-bold text-slate-800">{record.fullName}</p>
              </div>
              <div className="bg-white px-5 py-4 sm:px-6">
                <p className="text-xs font-semibold text-slate-500">الرقم الامتحاني</p>
                <p className="mt-1 text-sm font-bold tracking-wider text-slate-800" dir="ltr">{record.examNumber}</p>
              </div>
              <div className="bg-white px-5 py-4 sm:px-6">
                <p className="text-xs font-semibold text-slate-500">الجامعة</p>
                <p className="mt-1 text-sm font-bold text-slate-800">{record.university}</p>
              </div>
            </div>

            <div className="p-4 sm:p-8">
              <div className="overflow-hidden rounded-2xl border border-slate-200">
                <table className="w-full table-fixed border-collapse text-right">
                  <thead>
                    <tr className="bg-slate-50 text-xs font-bold text-slate-600 sm:text-sm">
                      <th scope="col" className="w-[68%] px-4 py-3.5 sm:px-6">المادة الدراسية</th>
                      <th scope="col" className="w-[32%] px-3 py-3.5 sm:px-6">التقدير</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {record.grades.map((grade) => (
                      <tr key={grade.subject} className="transition-colors hover:bg-slate-50/70">
                        <td className="px-4 py-3.5 text-sm font-semibold text-slate-700 sm:px-6">{grade.subject}</td>
                        <td className="px-3 py-3.5 sm:px-6">
                          <span className={`inline-flex min-w-[70px] justify-center rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ring-inset sm:text-xs ${ratingStyles[grade.rating]}`}>
                            {grade.rating}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-red-100 bg-red-50/70 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                <div>
                  <p className="text-xs font-semibold text-red-600">النتيجة النهائية التجريبية</p>
                  <p className="mt-0.5 text-2xl font-extrabold text-red-700">{record.finalResult}</p>
                </div>
                <button
                  type="button"
                  onClick={resetSearch}
                  className="h-11 rounded-xl border border-slate-300 bg-white px-5 text-sm font-bold text-slate-700 transition-all hover:border-blue-300 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
                >
                  بحث جديد
                </button>
              </div>
            </div>
          </section>
        )}

        <div className="mx-auto mt-8 flex max-w-2xl items-start gap-3 rounded-2xl border border-amber-200/80 bg-amber-50/80 px-4 py-3.5 text-xs leading-6 text-amber-900">
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" stroke="currentColor" strokeWidth="1.8">
            <path d="M12 22c5-2.4 8-6.3 8-11.2V5l-8-3-8 3v5.8C4 15.7 7 19.6 12 22Z" strokeLinejoin="round" />
            <path d="M12 8v5m0 3h.01" strokeLinecap="round" />
          </svg>
          <p><strong>تنبيه:</strong> هذه الواجهة محاكاة تعليمية غير رسمية، والبيانات المعروضة تجريبية ولا تمثل وثيقة أو نتيجة جامعية معتمدة.</p>
        </div>
      </main>

      <footer className="relative border-t border-slate-200/80 bg-white/60 px-4 py-5 text-center text-xs leading-6 text-slate-500">
        نموذج تجريبي للعرض فقط — لا يتم جمع أو تخزين أي بيانات.
      </footer>
    </div>
  )
}

export default App
