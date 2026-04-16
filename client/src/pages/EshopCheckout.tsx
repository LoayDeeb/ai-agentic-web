import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, CreditCard, ShieldCheck, ShoppingBag, Truck } from 'lucide-react'
import { EshopCartDrawer, EshopHeader } from '../components/eshop'
import { getEshopProductById, getRecommendedUpsells } from '../components/eshop/catalog'
import { onToolEvent } from '../features/agent/tools'
import { highlight } from '../features/agent/spotlight'
import { useEshopStore } from '../store/eshopStore'
import {
	type EshopCheckoutFieldName,
	useEshopCheckoutStore,
} from '../store/eshopCheckoutStore'

const paymentOptions = [
	{
		value: 'card_online',
		label: 'Pay online by card',
		copy: 'Fastest checkout with instant confirmation.',
	},
	{
		value: 'cash_on_delivery',
		label: 'Cash on delivery',
		copy: 'Pay when your order reaches you.',
	},
	{
		value: 'card_on_delivery',
		label: 'Card on delivery',
		copy: 'Tap to pay when the courier arrives.',
	},
] as const

function getFieldSelector(fieldName: EshopCheckoutFieldName) {
	return `#eshop-checkout-${fieldName}`
}

export default function EshopCheckout() {
	const navigate = useNavigate()
	const items = useEshopStore((state) => state.items)
	const isCartOpen = useEshopStore((state) => state.isCartOpen)
	const openCart = useEshopStore((state) => state.openCart)
	const closeCart = useEshopStore((state) => state.closeCart)
	const removeItem = useEshopStore((state) => state.removeItem)
	const addItem = useEshopStore((state) => state.addItem)
	const cartTotal = useEshopStore((state) => state.getCartTotal())
	const itemCount = useEshopStore((state) => state.getItemCount())
	const formData = useEshopCheckoutStore((state) => state.formData)
	const isSubmitted = useEshopCheckoutStore((state) => state.isSubmitted)
	const setField = useEshopCheckoutStore((state) => state.setField)
	const submitCheckout = useEshopCheckoutStore((state) => state.submit)
	const recommendedUpsells = React.useMemo(
		() => getRecommendedUpsells(items.map((item) => item.productId)),
		[items]
	)

	React.useEffect(() => {
		const unsubscribe = onToolEvent((tool, args) => {
			if (tool === 'highlightEshopCheckoutField' && args.fieldName) {
				highlight(getFieldSelector(args.fieldName), args.duration ?? 3)
			}
		})

		return unsubscribe
	}, [])

	const handleSubmit = React.useCallback(() => {
		const result = submitCheckout()
		if (!result.success && result.missingFields.length > 0) {
			const firstMissingField = result.missingFields[0]
			highlight(getFieldSelector(firstMissingField), 3)
		}
		return result
	}, [submitCheckout])

	const orderItems = items
		.map((item) => {
			const product = getEshopProductById(item.productId)
			return product ? { ...product, quantity: item.quantity } : null
		})
		.filter(Boolean)

	return (
		<div className="min-h-screen bg-[radial-gradient(circle_at_top,#f6f1ff_0%,#f8f8fc_24%,#f6f8fc_58%,#f1f5fb_100%)] text-slate-900">
			<EshopHeader itemCount={itemCount} onCartClick={openCart} />

			<main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
				<div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
					<button
						type="button"
						onClick={() => navigate('/eshop')}
						className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 font-medium text-slate-700 transition-colors hover:border-slate-300 hover:text-slate-900"
					>
						<ArrowLeft size={16} />
						Continue shopping
					</button>
					<span>/</span>
					<span className="font-semibold text-slate-900">Checkout</span>
				</div>

				<div className="mt-6 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
					<section className="rounded-[2rem] border border-slate-200/70 bg-white p-6 shadow-[0_20px_60px_rgba(20,16,50,0.08)] sm:p-8">
						<div className="flex items-start justify-between gap-4">
							<div>
								<p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6b5ca5]">
									Secure checkout
								</p>
								<h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
									Finish your order in one step
								</h1>
								<p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
									Add your contact and delivery details, then choose the payment option that suits you.
								</p>
							</div>
							<div className="hidden rounded-3xl bg-[#f3efff] p-4 text-[#2a0a76] sm:block">
								<ShieldCheck size={28} />
							</div>
						</div>

						{isSubmitted ? (
							<div className="mt-8 rounded-[1.75rem] border border-emerald-200 bg-emerald-50 p-6">
								<div className="flex items-start gap-4">
									<div className="rounded-full bg-emerald-500/10 p-3 text-emerald-600">
										<CheckCircle2 size={28} />
									</div>
									<div>
										<h2 className="text-2xl font-bold text-emerald-900">Order placed successfully</h2>
										<p className="mt-2 text-sm leading-6 text-emerald-800/80">
											Thanks {formData.fullName || 'there'}. Your order is confirmed and our team can
											reach you on {formData.phone || 'your phone number'} if anything is needed.
										</p>
										<div className="mt-4 grid gap-3 text-sm text-emerald-900 sm:grid-cols-2">
											<div className="rounded-2xl bg-white/75 p-4">
												<p className="font-semibold">Delivery address</p>
												<p className="mt-1 text-emerald-900/75">
													{[formData.city, formData.area, formData.streetAddress].filter(Boolean).join(', ')}
												</p>
											</div>
											<div className="rounded-2xl bg-white/75 p-4">
												<p className="font-semibold">Payment</p>
												<p className="mt-1 text-emerald-900/75">
													{paymentOptions.find((option) => option.value === formData.paymentMethod)?.label}
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						) : (
							<form
								className="mt-8 grid gap-6"
								onSubmit={(event) => {
									event.preventDefault()
									handleSubmit()
								}}
							>
								<div className="grid gap-5 sm:grid-cols-2">
									<FormField
										id="eshop-checkout-fullName"
										label="Full name"
										value={formData.fullName}
										onChange={(value) => setField('fullName', value)}
										placeholder="Enter your full name"
									/>
									<FormField
										id="eshop-checkout-phone"
										label="Phone number"
										value={formData.phone}
										onChange={(value) => setField('phone', value)}
										placeholder="07XXXXXXXX"
									/>
									<FormField
										id="eshop-checkout-email"
										label="Email address"
										value={formData.email}
										onChange={(value) => setField('email', value)}
										placeholder="name@example.com"
									/>
									<FormField
										id="eshop-checkout-city"
										label="City"
										value={formData.city}
										onChange={(value) => setField('city', value)}
										placeholder="Amman"
									/>
								</div>

								<div className="grid gap-5 sm:grid-cols-[0.8fr_1.2fr]">
									<FormField
										id="eshop-checkout-area"
										label="Area"
										value={formData.area}
										onChange={(value) => setField('area', value)}
										placeholder="Abdoun"
									/>
									<FormField
										id="eshop-checkout-streetAddress"
										label="Street address"
										value={formData.streetAddress}
										onChange={(value) => setField('streetAddress', value)}
										placeholder="Building, street, and apartment"
									/>
								</div>

								<div>
									<p className="mb-3 text-sm font-semibold text-slate-700">Payment method</p>
									<div className="grid gap-4 md:grid-cols-3">
										{paymentOptions.map((option) => {
											const active = formData.paymentMethod === option.value
											return (
												<button
													id={option.value === 'card_online' ? 'eshop-checkout-paymentMethod' : undefined}
													key={option.value}
													type="button"
													onClick={() => setField('paymentMethod', option.value)}
													className={`rounded-[1.5rem] border p-4 text-left transition-all ${
														active
															? 'border-[#2a0a76] bg-[#f2edff] shadow-[0_10px_30px_rgba(42,10,118,0.08)]'
															: 'border-slate-200 bg-slate-50 hover:border-slate-300'
													}`}
												>
													<div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
														<CreditCard size={16} className={active ? 'text-[#2a0a76]' : 'text-slate-500'} />
														{option.label}
													</div>
													<p className="mt-2 text-sm leading-6 text-slate-600">{option.copy}</p>
												</button>
											)
										})}
									</div>
								</div>

								<div>
									<label
										htmlFor="eshop-checkout-deliveryNotes"
										className="mb-2 block text-sm font-semibold text-slate-700"
									>
										Delivery notes
									</label>
									<textarea
										id="eshop-checkout-deliveryNotes"
										value={formData.deliveryNotes}
										onChange={(event) => setField('deliveryNotes', event.target.value)}
										placeholder="Optional instructions for the courier"
										className="min-h-[120px] w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-[#2a0a76] focus:bg-white"
									/>
								</div>

								<div className="flex flex-wrap items-center justify-between gap-4 rounded-[1.5rem] border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-600">
									<div className="flex items-center gap-2">
										<Truck size={18} className="text-[#2a0a76]" />
										Delivery across Jordan with contact confirmation before dispatch.
									</div>
									<button
										type="submit"
										className="inline-flex items-center justify-center rounded-full bg-[#1a0050] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2b0b73]"
									>
										Place order
									</button>
								</div>
							</form>
						)}
					</section>

					<div className="space-y-6">
						<section className="rounded-[2rem] border border-slate-200/70 bg-white p-6 shadow-[0_20px_60px_rgba(20,16,50,0.08)]">
							<div className="flex items-start justify-between gap-3">
								<div>
									<p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
										Order summary
									</p>
									<h2 className="mt-2 text-2xl font-bold text-slate-900">
										{itemCount} item{itemCount === 1 ? '' : 's'} ready
									</h2>
								</div>
								<div className="rounded-full bg-slate-100 p-3 text-slate-600">
									<ShoppingBag size={20} />
								</div>
							</div>

							{orderItems.length === 0 ? (
								<div className="mt-6 rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
									<p className="text-lg font-semibold text-slate-900">Your cart is empty</p>
									<p className="mt-2 text-sm leading-6 text-slate-600">
										Go back to the store, add a few products, then come back here to complete your order.
									</p>
									<Link
										to="/eshop"
										className="mt-4 inline-flex items-center justify-center rounded-full bg-[#1a0050] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2b0b73]"
									>
										Back to eShop
									</Link>
								</div>
							) : (
								<div className="mt-6 space-y-4">
									{orderItems.map((product) => (
										<div
											key={product.id}
											className="flex gap-4 rounded-[1.5rem] border border-slate-200 p-4"
										>
											<div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-slate-50">
												<img src={product.image} alt={product.name} className="h-16 w-16 object-contain" />
											</div>
											<div className="min-w-0 flex-1">
												<h3 className="text-sm font-semibold leading-6 text-slate-900">{product.name}</h3>
												<p className="mt-1 text-sm text-slate-500">Qty {product.quantity}</p>
												<p className="mt-2 text-base font-bold text-slate-900">
													{product.price} {product.currency}
												</p>
											</div>
										</div>
									))}

									<div className="rounded-[1.5rem] bg-[#f5f1ff] p-4">
										<div className="flex items-center justify-between text-sm text-slate-600">
											<span>Subtotal</span>
											<span>{cartTotal.toFixed(2)} JOD</span>
										</div>
										<div className="mt-3 flex items-center justify-between text-base font-bold text-slate-900">
											<span>Total</span>
											<span>{cartTotal.toFixed(2)} JOD</span>
										</div>
									</div>
								</div>
							)}
						</section>

						{recommendedUpsells.length > 0 ? (
							<section className="rounded-[2rem] border border-slate-200/70 bg-white p-6 shadow-[0_20px_60px_rgba(20,16,50,0.08)]">
								<p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
									Recommended add-ons
								</p>
								<h2 className="mt-2 text-2xl font-bold text-slate-900">Complete the setup</h2>
								<p className="mt-2 text-sm leading-6 text-slate-600">
									Popular picks that pair naturally with what is already in your cart.
								</p>
								<div className="mt-5 space-y-4">
									{recommendedUpsells.slice(0, 3).map((product) => (
										<div key={product.id} className="rounded-[1.5rem] border border-slate-200 p-4">
											<div className="flex items-center gap-4">
												<div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-slate-50">
													<img src={product.image} alt={product.name} className="h-14 w-14 object-contain" />
												</div>
												<div className="min-w-0 flex-1">
													<h3 className="text-sm font-semibold leading-6 text-slate-900">{product.name}</h3>
													<p className="mt-1 text-sm text-slate-500">
														{product.price} {product.currency}
													</p>
												</div>
											</div>
											<button
												type="button"
												onClick={() => addItem(product.id)}
												className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-[#2a0a76] px-4 py-2 text-sm font-semibold text-[#2a0a76] transition-colors hover:bg-[#f2edff]"
											>
												Add this too
											</button>
										</div>
									))}
								</div>
							</section>
						) : null}
					</div>
				</div>
			</main>

			<EshopCartDrawer
				items={items}
				isOpen={isCartOpen}
				onClose={closeCart}
				onRemove={removeItem}
				onProceedToCheckout={() => {
					closeCart()
					navigate('/eshop/checkout')
				}}
				total={cartTotal}
			/>
		</div>
	)
}

function FormField({
	id,
	label,
	value,
	placeholder,
	onChange,
}: {
	id: string
	label: string
	value: string
	placeholder: string
	onChange: (value: string) => void
}) {
	return (
		<div>
			<label htmlFor={id} className="mb-2 block text-sm font-semibold text-slate-700">
				{label}
			</label>
			<input
				id={id}
				value={value}
				onChange={(event) => onChange(event.target.value)}
				placeholder={placeholder}
				className="w-full rounded-[1.25rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-[#2a0a76] focus:bg-white"
			/>
		</div>
	)
}
