import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Info, Clock, ExternalLink, Lock } from 'lucide-react'

type ZATCALoginPortalProps = {
  onLogin?: (username: string, password: string) => void;
  onIAMLogin?: () => void;
  onForgotPassword?: () => void;
  onRegister?: (type: string) => void;
};

// @component: ZATCALoginPortal
export const ZATCALoginPortal = (props: ZATCALoginPortalProps) => {
  const { t } = useTranslation()
  const [showOTP, setShowOTP] = useState(false);
  const [showUnlock, setShowUnlock] = useState(false);
  const [showImportantInstructions, setShowImportantInstructions] = useState(false);
  const [showMobileNumberModal, setShowMobileNumberModal] = useState(false);
  const [showInfoTooltip, setShowInfoTooltip] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [otpValues, setOtpValues] = useState(['', '', '', '']);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [otpError, setOtpError] = useState('');
  const [selectedMobileType, setSelectedMobileType] = useState('');
  useEffect(() => {
    if (otpTimer > 0) {
      const interval = setInterval(() => {
        setOtpTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [otpTimer]);
  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otpValues];
      newOtp[index] = value;
      setOtpValues(newOtp);
      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };
  const handleLogin = () => {
    if (!username || !password) {
      setErrorMessage('Please enter both username and password');
      return;
    }
    setErrorMessage('');
    setShowOTP(true);
    setOtpTimer(120);
    props.onLogin?.(username, password);
  };
  const handleResendOTP = () => {
    setOtpTimer(120);
    setOtpError('');
  };
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // @return
  return <div className="flex h-screen w-full overflow-hidden bg-[#002447]">
      <div className="flex w-full flex-col md:flex-row">
        <div className="flex w-full items-center justify-center bg-[#002447] px-8 py-12 text-white md:w-5/12">
          <div className="w-full text-center">
            <img src="https://login.zatca.gov.sa/com.sap.portal.resourcerepository/repo/zatca/img/ZATCA-logo.png" alt="ZATCA Logo" className="mb-6 mx-auto h-auto max-w-[300px]" />
            <p className="px-8 text-sm md:text-base">
              {t('Welcome to the digital experience of the Zakat, Tax and Customs Authority')}
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col bg-white md:w-7/12">
          <div className="flex justify-end p-4">
            <button className="text-[#002447] font-semibold hover:underline">
              عربي
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-8 md:px-16 pb-8">
            <div className="mx-auto max-w-[450px]">
              {!showOTP && !showUnlock && <>
                  <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-[#002447]">{t('Login')}</h3>
                    <a href="#" onClick={e => e.preventDefault()} className="flex items-center gap-1 text-sm font-semibold text-[#002447] hover:underline">
                      <ExternalLink className="h-4 w-4" />
                      {t('LOGIN TO CUSTOMS')}
                    </a>
                  </div>

                  {errorMessage && <div className="mb-4 text-sm text-red-600">
                      {errorMessage}
                    </div>}

                  <hr className="mb-6 border-gray-200" />

                  <form onSubmit={e => {
                e.preventDefault();
                handleLogin();
              }} className="space-y-4">
                    <div className="relative">
                      <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder={t('TIN or Email')} className="w-full rounded-t border border-gray-300 bg-white py-3 pl-10 pr-10 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200" style={{
                    backgroundImage: "url('https://login.zatca.gov.sa/com.sap.portal.resourcerepository/repo/zatca/img/user.png')",
                    backgroundPosition: '10px center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '20px'
                  }} />
                      <button type="button" onMouseEnter={() => setShowInfoTooltip(true)} onMouseLeave={() => setShowInfoTooltip(false)} className="absolute right-3 top-3">
                        <Info className="h-5 w-5 text-gray-500" />
                      </button>
                      {showInfoTooltip && <div className="absolute right-0 top-12 z-10 w-full">
                          <img src="https://login.zatca.gov.sa/com.sap.portal.resourcerepository/repo/zatca/img/HoverImage.png" alt="Info" className="w-full" />
                        </div>}
                    </div>

                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder={t('Password')} className="w-full rounded-b border border-gray-300 bg-white py-3 pl-10 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200" style={{
                  backgroundImage: "url('https://login.zatca.gov.sa/com.sap.portal.resourcerepository/repo/zatca/img/password.png')",
                  backgroundPosition: '10px center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '20px'
                }} />

                    <div className="flex flex-col gap-2 text-sm">
                      <a href="#" onClick={e => {
                    e.preventDefault();
                    props.onForgotPassword?.();
                  }} className="font-semibold text-[#002447] hover:underline">
                        {t('Forgot Password or Username?')}
                      </a>
                      <button type="button" onClick={() => setShowMobileNumberModal(true)} className="text-left font-semibold text-[#002447] hover:underline">
                        {t('Change mobile number?')}
                      </button>
                    </div>

                    <button type="submit" className="w-full rounded bg-[#4fbbbd] py-3 text-lg font-medium text-white transition-colors hover:bg-[#3da5a7]">
                      {t('Login')}
                    </button>

                    <button type="button" onClick={() => props.onIAMLogin?.()} className="relative w-full rounded border border-gray-300 bg-white py-3 text-left pl-4 pr-16 text-sm font-semibold text-[#002447] transition-colors hover:bg-gray-50" style={{
                  backgroundImage: "url('https://login.zatca.gov.sa/com.sap.portal.resourcerepository/repo/zatca/img/iam_logo.png')",
                  backgroundPosition: 'right 10px center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '45px'
                }}>
                      {t('For Citizens/ Resident Individuals, Login through IAM')}
                    </button>

                    <button type="button" className="w-full rounded bg-[#0996d4] py-2.5 text-base font-medium text-white transition-colors hover:bg-[#0880b8]">
                      {t('Switch to new login screen')}
                    </button>
                  </form>

                  <div className="mt-8 space-y-3">
                    <a href="#" onClick={e => {
                  e.preventDefault();
                  props.onRegister?.('entities');
                }} className="block font-semibold text-[#002447] hover:underline">
                      {t('Entities Registration')}
                    </a>
                    <a href="#" onClick={e => {
                  e.preventDefault();
                  props.onRegister?.('individual-economic');
                }} className="block font-semibold text-[#002447] hover:underline">
                      {t("Individual's Registration (Economic Activities)")}
                    </a>
                    <a href="#" onClick={e => {
                  e.preventDefault();
                  props.onRegister?.('individual-property');
                }} className="block font-semibold text-[#002447] hover:underline">
                      {t("Individual's Registration (Selling Properties)")}
                    </a>
                  </div>

                  <div className="mt-8 space-y-3">
                    <button onClick={() => setShowImportantInstructions(true)} className="flex items-center gap-2 text-[#4fbbbd] hover:underline">
                      <Info className="h-4 w-4" />
                      {t('Important Instructions')}
                    </button>
                    <a href="#" className="block font-semibold text-[#002447] hover:underline">
                      {t('Education Journey')}
                    </a>
                    <a href="#" className="block font-semibold text-[#002447] hover:underline">
                      {t('Information security')}
                    </a>
                    <a href="#" className="block font-semibold text-[#002447] hover:underline">
                      {t('Privacy Statement')}
                    </a>
                  </div>
                </>}

              {showOTP && <div>
                  <button onClick={() => setShowOTP(false)} className="mb-6 flex items-center gap-2 text-[#002447] hover:underline">
                    <span>←</span>
                    {t('Back')}
                  </button>

                  <h1 className="mb-1 text-3xl font-bold text-[#002447]">{t('Verification Code')}</h1>
                  <h6 className="mb-6 text-sm text-blue-600">
                    {t('Please enter the verification code sent to your mobile')}
                  </h6>

                  {otpError && <div className="mb-4 text-sm text-red-600">
                      {otpError}
                    </div>}

                  <hr className="mb-6 border-gray-200" />

                  <h6 className="mb-4 text-gray-600">
                    {t('Mobile Number')} <span className="font-semibold">+966 XX XXX 1234</span>
                  </h6>

                  <div className="mb-6 flex gap-4">
                    {otpValues.map((value, index) => <input key={index} id={`otp-${index}`} type="number" maxLength={1} value={value} onChange={e => handleOtpChange(index, e.target.value)} className="h-12 w-12 rounded border border-gray-400 text-center text-xl focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200" />)}
                  </div>

                  <div className="mb-4 flex items-center gap-2 text-gray-600">
                    <Clock className="h-5 w-5" />
                    <span>{formatTime(otpTimer)}</span>
                  </div>

                  <button onClick={handleResendOTP} disabled={otpTimer > 0} className="mb-4 text-[#002447] disabled:cursor-not-allowed disabled:opacity-50 disabled:text-gray-400">
                    {t('Resend code')}
                  </button>

                  <p className="text-sm text-gray-600">
                    {t('The account will be locked after three failed verification code attempt')}
                  </p>
                </div>}

              {showUnlock && <div>
                  <button onClick={() => setShowUnlock(false)} className="mb-6 flex items-center gap-2 text-[#002447] hover:underline">
                    <span>←</span>
                    {t('Back')}
                  </button>

                  <h1 className="mb-6 text-3xl font-bold text-[#002447]">{t('Retrieve Login Data')}</h1>

                  <hr className="mb-6 border-gray-200" />

                  <div className="mb-6 text-center">
                    <Lock className="mx-auto mb-4 h-12 w-12 text-[#4fbbbd]" />
                    <p className="text-[#4fbbbd]">
                      <strong>{t('Dear Taxpayer,')}</strong>
                      <br />
                      {t('Your account has been locked due to several incorrect login attempts.')}
                      <br />
                      {t('Therefore, You can unlock the account by resetting the password now.')}
                    </p>
                  </div>

                  <button className="w-full rounded-lg bg-[#4fbbbd] py-3 text-white font-medium transition-colors hover:bg-[#3da5a7]">
                    {t('Reset Password')}
                  </button>
                </div>}
            </div>
          </div>
        </div>
      </div>

      {showImportantInstructions && <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 pt-24">
          <div className="relative w-full max-w-4xl animate-in fade-in zoom-in-95 duration-200">
            <div className="relative rounded border border-gray-400 bg-white shadow-2xl">
              <div className="flex items-center justify-between bg-[#509b8f] px-4 py-3 text-white">
                <h2 className="text-center flex-1 text-lg font-medium">{t('Important Instructions')}</h2>
                <button onClick={() => setShowImportantInstructions(false)} className="text-3xl font-semibold leading-none opacity-50 hover:opacity-100">
                  ×
                </button>
              </div>
              <div className="space-y-4 p-6 text-gray-600 leading-relaxed">
                <p>
                  The electronic portal of the General Authority for Zakat and Income allows the use of its services by establishing a special account for the taxpayer through the login by (TIN number OR E-mail) as user name and password.
                </p>
                <p>
                  When creating your account, please make sure your e-mail and mobile number are entered correctly. The (TIN number OR E-mail) will be use as a login name for the portal.
                </p>
                <p>
                  Please make sure that you enter the login code correctly when you log in so that the account is not blocked.
                </p>
                <div>
                  <p className="font-semibold text-gray-700">General requirements:</p>
                  <ul className="ml-6 mt-2 list-disc space-y-2">
                    <li>
                      Access to the portal services of the Zakat and Income Authority requires a new version of the browser, to see the basic requirements of the browser as well as, please{' '}
                      <a href="#" className="text-[#4fbbbd] hover:underline">
                        click here
                      </a>
                    </li>
                    <li>
                      For the most frequently asked questions about eService's, please{' '}
                      <a href="#" className="text-[#4fbbbd] hover:underline">
                        click here
                      </a>
                    </li>
                    <li>
                      To view the acknowledgment tables, please{' '}
                      <a href="#" className="text-[#4fbbbd] hover:underline">
                        click here
                      </a>
                    </li>
                    <li>
                      For registration and update steps please{' '}
                      <a href="#" className="text-[#4fbbbd] hover:underline">
                        click here
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>}

      {showMobileNumberModal && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 pt-48">
          <div className="relative w-80 animate-in fade-in zoom-in-95 duration-200">
            <div className="relative rounded border border-gray-400 bg-white shadow-2xl">
              <div className="bg-gradient-to-r from-[#19579d] to-[#1886c4] px-4 py-2 text-white">
                <button onClick={() => setShowMobileNumberModal(false)} className="float-right text-4xl font-bold leading-none cursor-pointer">
                  ×
                </button>
                <h2 className="py-2 text-center text-lg">{t('Change mobile number?')}</h2>
              </div>
              <div className="space-y-3 p-4 text-gray-600">
                <label className="flex cursor-pointer items-center gap-3">
                  <input type="radio" name="mobileType" value="individual" checked={selectedMobileType === 'individual'} onChange={e => setSelectedMobileType(e.target.value)} className="h-5 w-5" />
                  <span>{t('Individual/Establishment')}</span>
                </label>
                <label className="flex cursor-pointer items-center gap-3">
                  <input type="radio" name="mobileType" value="company" checked={selectedMobileType === 'company'} onChange={e => setSelectedMobileType(e.target.value)} className="h-5 w-5" />
                  <span>{t('Company')}</span>
                </label>
              </div>
            </div>
          </div>
        </div>}
    </div>;
};