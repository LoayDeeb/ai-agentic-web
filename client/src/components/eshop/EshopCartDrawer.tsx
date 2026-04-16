import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ShoppingBag, Trash2, X } from 'lucide-react'
import { getEshopProductById } from './catalog'
import type { EshopCartItem } from '../../store/eshopStore'

type EshopCartDrawerProps = {
	items: EshopCartItem[]
	isOpen: boolean
	onClose: () => void
	onRemove: (productId: number) => void
	onProceedToCheckout?: () => void
	total: number
}

export function EshopCartDrawer({
	items,
	isOpen,
	onClose,
	onRemove,
	onProceedToCheckout,
	total,
}: EshopCartDrawerProps) {
	return (
		<AnimatePresence>
			{isOpen ? (
				<>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={onClose}
						className="fixed inset-0 z-40 bg-slate-950/35 backdrop-blur-[2px]"
					/>
					<motion.aside
						initial={{ x: '100%' }}
						animate={{ x: 0 }}
						exit={{ x: '100%' }}
						transition={{ type: 'tween', duration: 0.25 }}
						className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-slate-200/70 bg-white shadow-2xl"
					>
						<div className="flex items-center justify-between border-b border-slate-200/70 px-6 py-5">
							<div>
								<p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
									Your cart
								</p>
								<h2 className="mt-1 text-2xl font-bold text-slate-900">Selected items</h2>
							</div>
							<button
								type="button"
								onClick={onClose}
								className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
							>
								<X size={20} />
							</button>
						</div>

						<div className="flex-1 overflow-y-auto px-6 py-5">
							{items.length === 0 ? (
								<div className="flex h-full flex-col items-center justify-center text-center">
									<div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-500">
										<ShoppingBag size={28} />
									</div>
									<h3 className="mt-5 text-xl font-semibold text-slate-900">Your cart is empty</h3>
									<p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
										Add a product from the eShop rails and the sales agent can walk you through the
										cart.
									</p>
								</div>
							) : (
								<div className="space-y-4">
									{items.map((item) => {
										const product = getEshopProductById(item.productId)
										if (!product) return null

										return (
											<div
												key={item.productId}
												className="flex gap-4 rounded-3xl border border-slate-200/80 p-4"
											>
												<div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-slate-50">
													<img
														src={product.image}
														alt={product.name}
														className="h-16 w-16 object-contain"
													/>
												</div>
												<div className="min-w-0 flex-1">
													<h3 className="text-sm font-semibold leading-6 text-slate-900">
														{product.name}
													</h3>
													<p className="mt-1 text-sm text-slate-500">
														Qty {item.quantity}
													</p>
													<p className="mt-2 text-base font-bold text-slate-900">
														{product.price} {product.currency}
													</p>
												</div>
												<button
													type="button"
													onClick={() => onRemove(item.productId)}
													className="self-start rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
												>
													<Trash2 size={18} />
												</button>
											</div>
										)
									})}
								</div>
							)}
						</div>

						<div className="border-t border-slate-200/70 px-6 py-5">
							<div className="flex items-center justify-between text-sm text-slate-500">
								<span>Subtotal</span>
								<span>{total.toFixed(2)} JOD</span>
							</div>
							<button
								type="button"
								disabled={items.length === 0}
								onClick={onProceedToCheckout}
								className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-[#1a0050] px-4 py-3 text-sm font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
							>
								Proceed to checkout
							</button>
						</div>
					</motion.aside>
				</>
			) : null}
		</AnimatePresence>
	)
}
