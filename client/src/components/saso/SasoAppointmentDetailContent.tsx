import React, { useState } from 'react'
import { Users, Clock, DollarSign, Monitor, MessageSquare, Phone } from 'lucide-react'
import { BreadcrumbSocial } from '../BreadcrumbSocial'
import { InstallmentHeader } from '../InstallmentHeader'
import { ServiceDescription } from '../ServiceDescription'
import { TabNavigation } from '../TabNavigation'
import { InfoCardItem } from '../InfoCardItem'
import { useNavigate } from 'react-router-dom'

const tabs = [
  { id: 'requirements', label: 'متطلبات الحصول على الخدمة' },
  { id: 'steps', label: 'خطوات تنفيذ الخدمة' },
  { id: 'documents', label: 'المرفقات' }
]

export function SasoAppointmentDetailContent() {
  const [activeTab, setActiveTab] = useState('requirements')
  const navigate = useNavigate()

  return (
    <div className="container mx-auto px-6 py-6" dir="rtl">
      <BreadcrumbSocial
        breadcrumbs={[
          { label: 'الرئيسية', href: '/saso' },
          { label: 'الخدمات الإلكترونية', href: '/saso/services' }
        ]}
        pageTitle="فحص المركبات المستوردة"
        shareTitle="فحص المركبات المستوردة"
      />

      <div className="flex flex-row-reverse gap-8">
        <div className="flex-1 max-w-[852px]">
          <InstallmentHeader
            title="فحص المركبات المستوردة"
            buttonText="ابدأ الخدمة"
            onButtonClick={() => navigate('/saso/service/imported-vehicles/submit')}
          />

          <ServiceDescription
            description="تمكن هذه الخدمة المستفيد من تقديم طلب فحص المركبات المستوردة إلكترونياً، واستكمال بيانات المركبة والمرفقات اللازمة للحصول على قرار المطابقة الفني."
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
                <li>إرفاق رقم الهيكل ورقم اللوحة الجمركية للمركبة.</li>
                <li>توفير شهادة المطابقة أو المستندات الفنية من بلد المنشأ.</li>
                <li>إرفاق فاتورة الشراء أو بيان الاستيراد.</li>
                <li>تأكيد بيانات المستفيد ومعلومات التواصل.</li>
              </ul>
            )}

            {activeTab === 'steps' && (
              <ol className="list-decimal pr-5 text-[#384250] leading-8">
                <li>اختر زر ابدأ الخدمة.</li>
                <li>أدخل بيانات المركبة المستوردة.</li>
                <li>ارفع المستندات المطلوبة وتحقق من اكتمالها.</li>
                <li>أرسل الطلب واستلم رقم مرجعي للمتابعة.</li>
              </ol>
            )}

            {activeTab === 'documents' && (
              <p className="text-[#384250]">المرفقات المتوقعة: شهادة المطابقة، بيان الاستيراد، وصورة هوية المستفيد.</p>
            )}
          </div>
        </div>

        <aside className="w-[380px] flex-shrink-0">
          <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
            <InfoCardItem
              icon={<Users className="w-6 h-6" />}
              title="الفئات المستفيدة"
              description="الأفراد، الوكلاء، وشركات الاستيراد"
            />
            <InfoCardItem
              icon={<Clock className="w-6 h-6" />}
              title="مدة تنفيذ الخدمة"
              description="يومان عمل بعد اكتمال المتطلبات"
            />
            <InfoCardItem
              icon={<DollarSign className="w-6 h-6" />}
              title="تكلفة الخدمة"
              description="حسب نوع المركبة وإجراءات الفحص"
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
              description="920033555"
            />
          </div>
        </aside>
      </div>
    </div>
  )
}
