import React, { useState } from 'react'
import { Users, Clock, DollarSign, Monitor, MessageSquare, Phone } from 'lucide-react'
import { BreadcrumbSocial } from '../BreadcrumbSocial'
import { InstallmentHeader } from '../InstallmentHeader'
import { ServiceDescription } from '../ServiceDescription'
import { TabNavigation } from '../TabNavigation'
import { InfoCardItem } from '../InfoCardItem'

const tabs = [
  { id: 'requirements', label: 'متطلبات الحصول على الخدمة' },
  { id: 'steps', label: 'خطوات تنفيذ الخدمة' },
  { id: 'documents', label: 'المرفقات' }
]

export function SasoAppointmentDetailContent() {
  const [activeTab, setActiveTab] = useState('requirements')

  return (
    <div className="container mx-auto px-6 py-6" dir="rtl">
      <BreadcrumbSocial
        breadcrumbs={[
          { label: 'الرئيسية', href: '/saso' },
          { label: 'الخدمات الإلكترونية', href: '/saso/services' }
        ]}
        pageTitle="حجز موعد إلكتروني"
        shareTitle="حجز موعد إلكتروني"
      />

      <div className="flex flex-row-reverse gap-8">
        <div className="flex-1 max-w-[852px]">
          <InstallmentHeader
            title="حجز موعد إلكتروني"
            buttonText="ابدأ الخدمة"
            onButtonClick={() => {}}
          />

          <ServiceDescription
            description="تهدف هذه الخدمة لتنظيم عمليات استقبال المراجعين بطريقة إلكترونية متكاملة وسلسة، مع إتاحة اختيار الفرع والتاريخ المناسب ومتابعة حالة الموعد."
            maxWidth={852}
            paddingY={12}
            paddingBottom={24}
          />

          <TabNavigation
            tabs={tabs}
            defaultActiveTab="requirements"
            onTabChange={setActiveTab}
          />

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            {activeTab === 'requirements' && (
              <ul className="list-disc pr-5 text-[#384250] leading-8">
                <li>الدخول عبر منصة النفاذ الوطني الموحد.</li>
                <li>اختيار الفرع المناسب وفق المنطقة.</li>
                <li>تحديد التاريخ والوقت المناسبين للزيارة.</li>
                <li>تأكيد بيانات المستفيد قبل إرسال الطلب.</li>
              </ul>
            )}

            {activeTab === 'steps' && (
              <ol className="list-decimal pr-5 text-[#384250] leading-8">
                <li>اختر زر ابدأ الخدمة.</li>
                <li>سجل الدخول إلى حسابك.</li>
                <li>حدد نوع الخدمة والفرع والموعد.</li>
                <li>أكد الطلب واستلم إشعار الموعد.</li>
              </ol>
            )}

            {activeTab === 'documents' && (
              <p className="text-[#384250]">لا توجد مرفقات مطلوبة لهذه الخدمة حالياً.</p>
            )}
          </div>
        </div>

        <aside className="w-[380px] flex-shrink-0">
          <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
            <InfoCardItem
              icon={<Users className="w-6 h-6" />}
              title="الفئات المستفيدة"
              description="الأفراد وقطاع الأعمال"
            />
            <InfoCardItem
              icon={<Clock className="w-6 h-6" />}
              title="مدة تنفيذ الخدمة"
              description="فوري بعد تأكيد الموعد"
            />
            <InfoCardItem
              icon={<DollarSign className="w-6 h-6" />}
              title="تكلفة الخدمة"
              description="بدون رسوم"
            />
            <InfoCardItem
              icon={<Monitor className="w-6 h-6" />}
              title="قنوات تقديم الخدمة"
              description="البوابة الإلكترونية"
            />
            <InfoCardItem
              icon={<MessageSquare className="w-6 h-6" />}
              title="الأسئلة الشائعة"
              description="متاحة عبر مركز المساعدة"
            />
            <InfoCardItem
              icon={<Phone className="w-6 h-6" />}
              title="خدمة العملاء"
              description="920000000"
            />
          </div>
        </aside>
      </div>
    </div>
  )
}
