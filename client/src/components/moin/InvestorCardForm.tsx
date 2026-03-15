import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ChevronRight, FileText, Info } from 'lucide-react'
import { cn } from '../../lib/utils'
import { useFormStore } from '../../store/formStore'
import { highlight } from '../../features/agent/spotlight'

type Step = {
	id: number
	title: string
}

const steps: Step[] = [
	{ id: 1, title: 'معلومات عامة' },
	{ id: 2, title: 'تقديم الطلب' },
]

export const InvestorCardForm = () => {
	const currentStep = useFormStore((s) => s.currentStep)
	const setCurrentStep = useFormStore((s) => s.setCurrentStep)
	const formData = useFormStore((s) => s.formData)
	const setField = useFormStore((s) => s.setField)

	const [agreed, setAgreed] = useState(false)
	const [submitted, setSubmitted] = useState(false)

	useEffect(() => {
		if (formData.moinTermsAccepted) {
			setAgreed(true)
		}
	}, [formData.moinTermsAccepted])

	useEffect(() => {
		const handler = (e: Event) => {
			const { tool, args } = (e as CustomEvent).detail

			if (tool === 'moinAgreeTerms') {
				setAgreed(true)
				setField('moinTermsAccepted', true)
			} else if (tool === 'goToFormStep') {
				setCurrentStep(args.step)
				window.scrollTo({ top: 0, behavior: 'smooth' })
			} else if (tool === 'submitForm') {
				if (agreed) {
					setSubmitted(true)
				}
			}
		}

		window.addEventListener('agentTool', handler)
		return () => window.removeEventListener('agentTool', handler)
	}, [agreed, setCurrentStep, setField])

	const handleNext = () => {
		if (currentStep < steps.length && agreed) {
			setCurrentStep(currentStep + 1)
		}
	}

	const handleSubmit = () => {
		if (agreed) {
			setSubmitted(true)
		}
	}

	if (submitted) {
		return (
			<div className="w-full max-w-4xl mx-auto p-4 md:p-8" dir="rtl">
				<motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					className="bg-white rounded-xl shadow-[0_6px_12px_rgba(140,152,164,0.075)] border border-[#e7eaf3b3] p-10 text-center"
				>
					<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
						<Check className="w-8 h-8 text-green-600" />
					</div>
					<h3 className="text-xl font-bold text-[#1c1c1c] mb-3">
						تم تقديم الطلب بنجاح
					</h3>
					<p className="text-[#677788] mb-6">
						سيتم مراجعة طلبك وإشعارك بالنتيجة خلال أيام العمل
						الرسمية
					</p>
					<div className="bg-[#f8f9fa] rounded-lg p-4 inline-block">
						<p className="text-sm text-[#677788]">رقم الطلب</p>
						<p className="text-lg font-bold text-[#132144]">
							MOI-2026-{Math.floor(Math.random() * 90000) + 10000}
						</p>
					</div>
				</motion.div>
			</div>
		)
	}

	return (
		<div
			className="w-full max-w-4xl mx-auto p-4 md:p-8 font-sans"
			dir="rtl"
		>
			{/* Progress Stepper */}
			<div className="flex items-center justify-between mb-12 relative px-4">
				{steps.map((step, index) => (
					<React.Fragment key={step.id}>
						<div className="flex items-center gap-4 relative z-10">
							<div
								className={cn(
									'w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors duration-300',
									currentStep >= step.id
										? 'bg-[#377dff] text-white'
										: 'bg-[#1321441a] text-[#132144]'
								)}
							>
								{currentStep > step.id ? (
									<Check size={18} />
								) : (
									step.id
								)}
							</div>
							<span
								className={cn(
									'font-semibold text-sm transition-colors duration-300',
									currentStep >= step.id
										? 'text-[#377dff]'
										: 'text-[#1e2022]'
								)}
							>
								{step.title}
							</span>
						</div>
						{index < steps.length - 1 && (
							<div className="flex-1 h-[2px] bg-[#e7eaf3] mx-4 relative top-0" />
						)}
					</React.Fragment>
				))}
			</div>

			{/* Form Content */}
			<AnimatePresence mode="wait">
				<motion.div
					key={currentStep}
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: -20 }}
					transition={{ duration: 0.3 }}
					className="bg-white rounded-xl shadow-[0_6px_12px_rgba(140,152,164,0.075)] border border-[#e7eaf3b3] overflow-hidden"
				>
					{/* Header */}
					<div className="px-6 py-5 border-b border-[#e7eaf3b3]">
						<h3 className="text-lg font-bold text-[#1c1c1c]">
							طلب اصدار بطاقة المستثمر للفئة (أ)
						</h3>
					</div>

					{/* Body */}
					<div className="p-6 md:p-10">
						{currentStep === 1 ? (
							<div className="space-y-8">
								<p className="text-[#677788] leading-relaxed">
									تتيح هذه الخدمة امكانية تقديم طلب منحه
									لبطاقة مستثمر من فئة أ وتعتمد في ذلك
									مديرية خدمات المستثمر على قيمة الحصة
									المالية المملوكة له في الشركة.
								</p>

								<div className="space-y-4">
									<div className="flex items-center gap-2">
										<Info
											className="text-[#377dff]"
											size={20}
										/>
										<h3 className="text-lg font-bold text-[#1c1c1c]">
											شروط الطلب
										</h3>
									</div>

									<ol
										className="list-decimal list-inside space-y-4 text-[#677788] pr-4"
										id="moin-terms-list"
									>
										<li className="leading-relaxed">
											إذا بلغت حصة المستثمر في رأس المال
											المسجل للشركة أو مجموع حصصه في
											الشركات التي يمتلك حصصاً فيها (150)
											ألف دينار أردني على الأقل وتوفر تلك
											الشركة او الشركات ما لا يقل عن (25)
											وظيفة للأردنيين او (5) وظائف
											للأردنيين لنشاط تكنولوجيا المعلومات
											(تطوير البرمجيات وتطبيقاتها ورخصها)
											فقط.
										</li>
										<li className="leading-relaxed">
											إذا بلغت حصة المستثمر في رأس المال
											المسجل للشركة او مجموع حصصه في
											الشركات التي يمتلك حصصاً فيها (300)
											ألف دينار أردني على الاقل وتوفر تلك
											الشركة او الشركات ما لا يقل عن (15)
											وظيفة للأردنيين او (3) وظائف
											للأردنيين لنشاط تكنولوجيا المعلومات
											(تطوير البرمجيات وتطبيقاتها ورخصها)
											فقط.
										</li>
										<li className="leading-relaxed">
											عند اصدار البطاقة يشترط ان تكون
											اعداد العمالة الاردنية المشار اليها
											في البندين (أ، ب) اعلاه مضى على
											تسجيلها لدى المؤسسة العامة للضمان
											الاجتماعي لمدة لا تقل عن (4) شهور،
											وعند تجديدها يشترط ان ان تكون اعداد
											العمالة الاردنية استمرت كامل الفترة
											السابقة.
										</li>
									</ol>
								</div>

								<div className="flex justify-start">
									<button
										type="button"
										className="flex items-center gap-2 px-4 py-2.5 bg-[#f9fafc] border border-[#e7eaf3] rounded-md text-[#1c1c1c] hover:bg-[#f1f4f8] transition-colors"
									>
										<FileText
											size={18}
											className="text-[#377dff]"
										/>
										<span>نموذج اقرار</span>
									</button>
								</div>

								<div
									className="pt-6 border-t border-[#e7eaf3b3]"
									id="moin-agreement-section"
								>
									<label className="flex items-start gap-3 cursor-pointer group">
										<input
											type="checkbox"
											checked={agreed}
											onChange={(e) => {
												setAgreed(e.target.checked)
												setField(
													'moinTermsAccepted',
													e.target.checked
												)
											}}
											name="moinTermsAccepted"
											className="mt-1 w-4 h-4 text-[#377dff] rounded border-[#e7eaf3] focus:ring-[#377dff]"
										/>
										<span className="text-sm text-[#677788] group-hover:text-[#1c1c1c] transition-colors">
											اتعهد بصحة البيانات المدخلة واوافق
											على استرجاع بياناتي الشخصية
											والاطلاع عليها ومعالجتها من قبل
											الجهات والأطراف المعنية ذات العلاقة،
											وذلك لغايات التقديم والحصول على
											الخدمة
										</span>
									</label>
								</div>

								<div className="flex justify-center pt-4">
									<button
										onClick={handleNext}
										disabled={!agreed}
										className={cn(
											'px-10 py-3 rounded-md font-medium transition-all duration-200',
											agreed
												? 'bg-[#377dff] text-white hover:bg-[#2e6ae5] shadow-lg shadow-[#377dff20]'
												: 'bg-[#377dff] opacity-50 text-white cursor-not-allowed'
										)}
									>
										تقديم
									</button>
								</div>
							</div>
						) : (
							<div className="flex flex-col items-center justify-center py-12 space-y-6">
								<div className="text-red-500 text-sm mb-4">
									(*) متطلبات إلزامية
								</div>

								<div className="flex gap-4">
									<button
										onClick={() => setCurrentStep(1)}
										className="px-6 py-3 border border-[#e7eaf3] text-[#71869d] rounded-md hover:bg-gray-50 transition-colors"
									>
										الشروط
									</button>
									<button
										onClick={handleSubmit}
										className="px-10 py-3 bg-[#377dff] text-white rounded-md hover:bg-[#2e6ae5] shadow-lg shadow-[#377dff20] transition-colors flex items-center gap-2"
									>
										إرسال الطلب
										<ChevronRight
											size={18}
											className="rotate-180"
										/>
									</button>
								</div>
							</div>
						)}
					</div>
				</motion.div>
			</AnimatePresence>
		</div>
	)
}
