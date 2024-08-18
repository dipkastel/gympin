export const serviceEnum = {
    "public org.springframework.http.ResponseEntity<?> com.notrika.gympin.controller.impl.user.AccountControllerImpl.refreshToken(com.notrika.gympin.common.user.user.param.RefreshTokenParam)": "نوسازی توکن",
    "public org.springframework.http.ResponseEntity<com.notrika.gympin.common.qrCodes.dto.QrCodeDto> com.notrika.gympin.controller.impl.qrCode.QrCodeControllerImpl.getCode(com.notrika.gympin.common.qrCodes.param.QrCodeParam) throws java.lang.Exception": "دریافت qr کد جدید",
    "public org.springframework.http.ResponseEntity<java.util.List<com.notrika.gympin.common.settings.note.dto.SimpleNoteDto>> com.notrika.gympin.controller.impl.settings.note.NoteControllerImpl.getByParam(com.notrika.gympin.common.settings.note.param.NoteParam)": "دریافت یادداشت ها و دفتر چه تلفن",
    "public org.springframework.http.ResponseEntity<com.notrika.gympin.common.purchased.purchasedSubscribe.dto.PurchasedSubscribeDto> com.notrika.gympin.controller.impl.purchased.purchasedSubscribe.PurchasedSubscribeControllerImpl.addEnterToSubscribe(com.notrika.gympin.common.purchased.purchasedSubscribe.param.PurchasedSubscribeParam) throws java.lang.Exception": "ثبت ورود برای عضویت",
    "public org.springframework.http.ResponseEntity<com.notrika.gympin.common.finance.invoice.dto.InvoiceDto> com.notrika.gympin.controller.impl.finance.invoice.InvoiceControllerImpl.userCheckout(com.notrika.gympin.common.finance.invoice.param.InvoiceCheckoutParam) throws java.lang.Exception": "پرداخت سبد خرید",
    "public org.springframework.http.ResponseEntity<java.util.List<com.notrika.gympin.common.place.about.dto.PlaceAboutDto>> com.notrika.gympin.controller.impl.place.PlaceAboutControllerImpl.getAllAboutByPlaces(java.util.List<com.notrika.gympin.common.place.place.param.PlaceParam>)": "دریافت درباره و قوانبن و مقررات مجموعه",
    "public org.springframework.http.ResponseEntity<com.notrika.gympin.common.finance.invoice.dto.InvoiceDto> com.notrika.gympin.controller.impl.finance.invoice.InvoiceControllerImpl.addBuyable(com.notrika.gympin.common.finance.invoice.param.InvoiceBuyableParam) throws java.lang.Exception": "افزودن به سبد خرید",
    "public org.springframework.http.ResponseEntity<java.lang.Boolean> com.notrika.gympin.controller.impl.purchased.purchasedSubscribe.PurchasedSubscribeControllerImpl.acceptEnterRequested(com.notrika.gympin.common.purchased.purchasedSubscribe.param.PurchasedSubscribeParam) throws java.lang.Exception": "تایید درخواست ورود کاربر",
    "public org.springframework.http.ResponseEntity<java.util.List<com.notrika.gympin.common.purchased.purchasedSubscribe.dto.PurchasedSubscribeDto>> com.notrika.gympin.controller.impl.purchased.purchasedSubscribe.PurchasedSubscribeControllerImpl.getUserSubscribesByPlace(com.notrika.gympin.common.purchased.purchased.param.UserPlacePurchasedParam) throws java.lang.Exception": "دریافت بلیط های خریداری شده از مجموعه",
    "public org.springframework.http.ResponseEntity<java.lang.Boolean> com.notrika.gympin.controller.impl.purchased.purchasedSubscribe.PurchasedSubscribeControllerImpl.enterRequest(com.notrika.gympin.common.purchased.purchasedSubscribe.param.PurchasedSubscribeParam) throws java.lang.Exception": "ثبت درخواست ورود به مجموعه",
    "public org.springframework.http.ResponseEntity<java.lang.String> com.notrika.gympin.controller.impl.finance.IncreaseUserDeposit.FinanceIncreaseUserDepositControllerImpl.requestIncreaseUserDeposits(com.notrika.gympin.common.finance.IncreaseUserDeposit.param.RequestIncreaseUserDepositParam)": "درخواست افزایش شارژ کاربر",
    "public org.springframework.http.ResponseEntity<com.notrika.gympin.common.ticket.buyable.dto.TicketBuyableDto> com.notrika.gympin.controller.impl.ticket.buyable.TicketBuyableControllerImpl.setTicketBeneficiary(com.notrika.gympin.common.ticket.buyable.param.TicketBuyableParam)": "ثبت ذی نفع برای بلیط",
    "public org.springframework.http.ResponseEntity<com.notrika.gympin.common.place.personnel.dto.PlacePersonnelDto> com.notrika.gympin.controller.impl.place.PlacePersonnelControllerImpl.updatePersonnelCommissionFee(com.notrika.gympin.common.place.personnel.param.PlacePersonnelParam)": "ویرایش کمیسیون",
    "public org.springframework.http.ResponseEntity<com.notrika.gympin.common.place.personnel.dto.PlacePersonnelDto> com.notrika.gympin.controller.impl.place.PlacePersonnelControllerImpl.addRole(com.notrika.gympin.common.place.personnel.param.PlacePersonnelParam)": "ثبت نقش برای پرسنل مرکز",
    "public org.springframework.http.ResponseEntity<com.notrika.gympin.common.finance.IncreaseUserDeposit.dto.FinanceIncreaseUserDepositDto> com.notrika.gympin.controller.impl.finance.IncreaseUserDeposit.FinanceIncreaseUserDepositControllerImpl.confirmIncreaseRequest(com.notrika.gympin.common.finance.IncreaseUserDeposit.param.FinanceIncreaseUserDepositParam)": "تایید افزایش شارژ کاربر",
    "public org.springframework.http.ResponseEntity<com.notrika.gympin.common.finance.IncreaseCorporateDeposit.dto.FinanceIncreaseCorporateDepositDto> com.notrika.gympin.controller.impl.finance.IncreaseCorporateDeposit.FinanceIncreaseCorporateDepositControllerImpl.confirmIncreaseRequest(com.notrika.gympin.common.finance.IncreaseCorporateDeposit.param.FinanceIncreaseCorporateDepositParam)": "تایید افزایش شارژ شرکت",
    "public org.springframework.http.ResponseEntity<com.notrika.gympin.common.settings.base.dto.WebAppSplashDto> com.notrika.gympin.controller.impl.settings.ApplicationConfigControllerImpl.WebAppSplash(com.notrika.gympin.common.settings.base.param.WebAppSplashParam)": "دریافت اطلاعات اولیه اپلیکیشن وب",
    "public org.springframework.http.ResponseEntity<com.notrika.gympin.common.user.user.dto.UserDto> com.notrika.gympin.controller.impl.user.AccountControllerImpl.loginUser(com.notrika.gympin.common.user.user.param.LoginParam) throws com.notrika.gympin.common.util.exception.ExceptionBase": "ورود کاربر",
    "public org.springframework.http.ResponseEntity<java.lang.Boolean> com.notrika.gympin.controller.impl.user.AccountControllerImpl.sendSms(com.notrika.gympin.common.user.user.param.UserSendSmsParam) throws com.notrika.gympin.common.util.exception.ExceptionBase": "دریافت پیامک ورود",
    "public org.springframework.http.ResponseEntity<com.notrika.gympin.common.support.dto.SupportDto> com.notrika.gympin.controller.impl.support.SupportControllerImpl.addMessageToSupport(com.notrika.gympin.common.support.param.SupportMessageParam) throws java.lang.Exception": "افزودن پیام به پشتیبانی",
    "public org.springframework.http.ResponseEntity<com.notrika.gympin.common.ticket.ticketSubscribe.dto.TicketSubscribeDto> com.notrika.gympin.controller.impl.ticket.ticketSubscribe.TicketSubscribeControllerImpl.addSubscribeActiveTimes(com.notrika.gympin.common.ticket.common.param.TicketActiveTimesParam)": "افزودن زمان فعالیت به عضویت",
    "public org.springframework.http.ResponseEntity<com.notrika.gympin.common.ticket.ticketSubscribe.dto.TicketSubscribeDto> com.notrika.gympin.controller.impl.ticket.ticketSubscribe.TicketSubscribeControllerImpl.deleteSubscribeActiveTimes(com.notrika.gympin.common.ticket.common.param.TicketActiveTimesParam)": "حذف زمان فعالیت  از عضویت",
    "public org.springframework.http.ResponseEntity<java.util.List<com.notrika.gympin.common.ticket.common.dto.ActiveTimesDto>> com.notrika.gympin.controller.impl.ticket.common.ActiveTimesControllerImpl.addAll(java.util.List<com.notrika.gympin.common.ticket.common.param.ActiveTimesParam>)": "افزودن زمان فعالیت ها",
    "public org.springframework.http.ResponseEntity<com.notrika.gympin.common.settings.base.dto.MasterSplashDto> com.notrika.gympin.controller.impl.settings.ApplicationConfigControllerImpl.MasterSplash(com.notrika.gympin.common.settings.base.param.MasterSplashParam)": "دریافت اطلاعات اولیه اپلیکیشن مراکز",
    "public org.springframework.http.ResponseEntity<com.notrika.gympin.common.settings.base.dto.CorporateSplashDto> com.notrika.gympin.controller.impl.settings.ApplicationConfigControllerImpl.CorporateSplash(com.notrika.gympin.common.settings.base.param.CorporateSplashParam)": "دریافت اطلاعات اولیه اپلیکیشن سازمان ها",
    "public org.springframework.http.ResponseEntity<java.lang.Boolean> com.notrika.gympin.controller.impl.user.AccountControllerImpl.RequestRegisterPlace(com.notrika.gympin.common.user.user.param.RequestRegisterParam)": "درخواست عضویت مرکز",
    "public org.springframework.http.ResponseEntity<java.util.List<com.notrika.gympin.common.place.personnel.dto.PlacePersonnelAccessDto>> com.notrika.gympin.controller.impl.place.PlacePersonnelControllerImpl.updatePersonnelAccess(java.util.List<com.notrika.gympin.common.place.personnel.param.PlacePersonnelAccessParam>)": "ویرایش دسترسی پرسنل به بلیط",
    "public org.springframework.http.ResponseEntity<java.util.List<com.notrika.gympin.common.place.personnel.dto.PlacePersonnelBuyableAccessDto>> com.notrika.gympin.controller.impl.place.PlacePersonnelControllerImpl.updatePersonnelBuyableAccess(java.util.List<com.notrika.gympin.common.place.personnel.param.PlacePersonnelBuyableAccessParam>)": "ویرایش دسترسی پرسنل به بخش ها",
    "public org.springframework.http.ResponseEntity<com.notrika.gympin.common.finance.invoice.dto.InvoiceDto> com.notrika.gympin.controller.impl.finance.invoice.InvoiceControllerImpl.changeInvoiceBuyableCount(com.notrika.gympin.common.finance.invoice.param.InvoiceBuyableParam) throws java.lang.Exception": "تغییر تعداد بلیط در سبد خرید یا فاکتور",
    "public org.springframework.http.ResponseEntity<com.notrika.gympin.common.user.user.dto.UserRegisterDto> com.notrika.gympin.controller.impl.user.AccountControllerImpl.registerByInviteCode(com.notrika.gympin.common.user.user.param.UserRegisterParam) throws com.notrika.gympin.common.util.exception.ExceptionBase": "ثبت نام با کد معرف",
    "public org.springframework.http.ResponseEntity<java.lang.Boolean> com.notrika.gympin.controller.impl.settings.sms.SmsControllerImpl.changeSmsStatus(com.notrika.gympin.common.settings.sms.param.SmsParam) throws java.lang.Exception": "تغییر وضعیت پیامک",
    "public org.springframework.http.ResponseEntity<java.util.List<com.notrika.gympin.common.settings.note.dto.NoteDto>> com.notrika.gympin.controller.impl.settings.note.NoteControllerImpl.getByParam(com.notrika.gympin.common.settings.note.param.NoteParam)": "دریافت یادداشت ها",
    "public org.springframework.http.ResponseEntity<com.notrika.gympin.common.user.user.dto.UserDto> com.notrika.gympin.controller.impl.user.UserControllerImpl.updateUserRole(com.notrika.gympin.common.user.user.param.UserRoleUpdateParam)": "تغییر نقش کاربر",
    "public org.springframework.http.ResponseEntity<java.util.List<com.notrika.gympin.common.ticket.ticketSubscribe.dto.ActiveTimesDto>> com.notrika.gympin.controller.impl.ticket.ticketSubscribe.ActiveTimesControllerImpl.addAll(java.util.List<com.notrika.gympin.common.ticket.ticketSubscribe.param.ActiveTimesParam>)": "افزودن زمان فعالیت",
    "public org.springframework.http.ResponseEntity<com.notrika.gympin.common.ticket.ticketSubscribe.dto.TicketSubscribeDto> com.notrika.gympin.controller.impl.ticket.ticketSubscribe.TicketSubscribeControllerImpl.addSubscribeActiveTimes(com.notrika.gympin.common.ticket.ticketSubscribe.param.TicketSubscribeActiveTimesParam)": "افزودن زمان فعالیت به بلیط",
    "public org.springframework.http.ResponseEntity<com.notrika.gympin.common.ticket.ticketSubscribe.dto.TicketSubscribeDto> com.notrika.gympin.controller.impl.ticket.ticketSubscribe.TicketSubscribeControllerImpl.addSport(com.notrika.gympin.common.ticket.ticketSubscribe.param.TicketSubscribeSportParam)": "افزودن ورزش به عضویت",
    "public org.springframework.http.ResponseEntity<com.notrika.gympin.common.place.place.dto.PlaceDto> com.notrika.gympin.controller.impl.place.PlaceControllerImpl.addMultimediaList(com.notrika.gympin.common.place.place.param.PlaceMultimediaListParam)": "افزودن تصویر به مجموعه",
    "public org.springframework.http.ResponseEntity<com.notrika.gympin.common.place.place.dto.PlaceDto> com.notrika.gympin.controller.impl.place.PlaceControllerImpl.changeStatus(com.notrika.gympin.common.place.place.param.PlaceParam)": "تغییر وضعیت مرکز",
    "public org.springframework.http.ResponseEntity<com.notrika.gympin.common.corporate.corporatePersonnel.dto.CorporatePersonnelCreditDto> com.notrika.gympin.controller.impl.corporate.CorporatePersonnelControllerImpl.addPersonnelCredit(com.notrika.gympin.common.corporate.corporatePersonnel.param.CorporatePersonnelCreditParam)": "افزودن اعتبار به پرسنل",
    "public org.springframework.http.ResponseEntity<com.notrika.gympin.common.corporate.corporate.dto.CorporateDto> com.notrika.gympin.controller.impl.corporate.CorporateControllerImpl.updateStepPayment(com.notrika.gympin.common.corporate.corporate.param.CorporateParam)": "بروز رسانی مرحله پرداخت",
    "public org.springframework.http.ResponseEntity<com.notrika.gympin.common.finance.invoice.dto.InvoiceDto> com.notrika.gympin.controller.impl.finance.invoice.InvoiceControllerImpl.changeStatus(com.notrika.gympin.common.finance.invoice.param.InvoiceParam) throws java.lang.Exception": "تغییر وضعیت فاکتور",
    "public org.springframework.http.ResponseEntity<com.notrika.gympin.common.finance.invoice.dto.InvoiceDto> com.notrika.gympin.controller.impl.finance.invoice.InvoiceControllerImpl.checkout(com.notrika.gympin.common.finance.invoice.param.InvoiceCheckoutParam) throws java.lang.Exception": "پرداخت فاکتور",
    "public org.springframework.http.ResponseEntity<java.lang.Boolean> com.notrika.gympin.controller.impl.purchased.purchasedSubscribe.PurchasedSubscribeControllerImpl.increaseExpireDate(com.notrika.gympin.common.purchased.purchasedSubscribe.param.IncreaseExpireParam) throws java.lang.Exception": "افزایش تاریخ انقضای بلیط",
    "public org.springframework.http.ResponseEntity<com.notrika.gympin.common.corporate.corporate.dto.CorporateDto> com.notrika.gympin.controller.impl.corporate.CorporateControllerImpl.updateStatus(com.notrika.gympin.common.corporate.corporate.param.CorporateParam)": "سازمان تغییر وضعیت",
    "public org.springframework.http.ResponseEntity<com.notrika.gympin.common.ticket.ticketSubscribe.dto.TicketSubscribeDto> com.notrika.gympin.controller.impl.ticket.ticketSubscribe.TicketSubscribeControllerImpl.changeTicketSubscribeStatus(com.notrika.gympin.common.ticket.ticketSubscribe.param.TicketSubscribeParam)": "تغییر وضعیت عضویت",
    "public org.springframework.http.ResponseEntity<com.notrika.gympin.common.user.user.dto.UserDto> com.notrika.gympin.controller.impl.user.UserControllerImpl.updateUserAvatar(com.notrika.gympin.common.user.user.param.UserAvatarParam)": "تغییر تصویر کاربر",
    "public org.springframework.http.ResponseEntity<com.notrika.gympin.common.corporate.corporatePersonnel.dto.CorporatePersonnelGroupDto> com.notrika.gympin.controller.impl.corporate.CorporateControllerImpl.deleteCorporateGroup(com.notrika.gympin.common.corporate.corporatePersonnel.param.CorporatePersonnelGroupParam)": "حذف کروه پرسنل سازمان",
    "public org.springframework.http.ResponseEntity<java.util.List<com.notrika.gympin.common.corporate.corporatePersonnel.dto.CorporatePersonnelCreditDto>> com.notrika.gympin.controller.impl.corporate.CorporatePersonnelControllerImpl.addToAllPersonnelCredit(com.notrika.gympin.common.corporate.corporatePersonnel.param.CorporatePersonnelCreditParam)": "افزایش اعتبار به همه پرسنل",
    "public org.springframework.http.ResponseEntity<com.notrika.gympin.common.corporate.corporatePersonnel.dto.CorporatePersonnelGroupDto> com.notrika.gympin.controller.impl.corporate.CorporateControllerImpl.addCorporateGroup(com.notrika.gympin.common.corporate.corporatePersonnel.param.CorporatePersonnelGroupParam)": "افزودن گروه پرسنل سازمان",
    "public org.springframework.http.ResponseEntity<com.notrika.gympin.common.finance.gateway.dto.GatewaysDto> com.notrika.gympin.controller.impl.finance.gateway.GatewayControllerImpl.updateImage(com.notrika.gympin.common.finance.gateway.param.GatewaysParam)": "درگاه ها تغییر تصویر",
    "public org.springframework.http.ResponseEntity<com.notrika.gympin.common.finance.gateway.dto.GatewaysDto> com.notrika.gympin.controller.impl.finance.gateway.GatewayControllerImpl.updateImage(com.notrika.gympin.common.finance.gateway.param.GatewaysParam) throws java.lang.Exception": "درگاه تغییر تصویر",
    "public org.springframework.http.ResponseEntity<java.lang.String> com.notrika.gympin.controller.impl.finance.IncreaseCorporateDeposit.FinanceIncreaseCorporateDepositControllerImpl.requestIncreaseCorporateDeposits(com.notrika.gympin.common.finance.IncreaseCorporateDeposit.param.RequestIncreaseCorporateDepositParam)": "درخواست افزایش اعتبار کاربر",
    "public org.springframework.http.ResponseEntity<com.notrika.gympin.common.corporate.corporate.dto.CorporateDto> com.notrika.gympin.controller.impl.corporate.CorporateControllerImpl.updateLogo(com.notrika.gympin.common.corporate.corporate.param.CorporateLogoParam)": "تغییر لوگو شرکت",
    "public org.springframework.http.ResponseEntity<com.notrika.gympin.common.finance.settlement.dto.FinanceSettlementUserDepositDto> com.notrika.gympin.controller.impl.finance.Settlement.FinanceSettlementUserDepositControllerImpl.confirmSettlementRequest(com.notrika.gympin.common.finance.settlement.param.FinanceSettlementUserDepositParam)": "تایید درخواست پرداخت",
    "public org.springframework.http.ResponseEntity<com.notrika.gympin.common.ticket.ticketSubscribe.dto.TicketSubscribeDto> com.notrika.gympin.controller.impl.ticket.ticketSubscribe.TicketSubscribeControllerImpl.deleteSport(com.notrika.gympin.common.ticket.ticketSubscribe.param.TicketSubscribeSportParam)": "حذف ورزش",
    "public org.springframework.http.ResponseEntity<com.notrika.gympin.common.purchased.purchasedSubscribe.dto.PurchasedSubscribeDto> com.notrika.gympin.controller.impl.purchased.purchasedSubscribe.PurchasedSubscribeControllerImpl.updateStatus(com.notrika.gympin.common.purchased.purchasedSubscribe.param.PurchasedSubscribeParam) throws java.lang.Exception": "تغییر وضعیت بلیط",
    "public org.springframework.http.ResponseEntity<java.util.List<com.notrika.gympin.common.purchased.purchasedSubscribe.dto.PurchasedSubscribeDto>> com.notrika.gympin.controller.impl.purchased.purchasedSubscribe.PurchasedSubscribeControllerImpl.getUserSubscribesByPlace(com.notrika.gympin.common.purchased.purchasedSubscribe.param.UserPurchasedSubscribesParam) throws java.lang.Exception": "دریافت بلیط های مرکز",
    "public org.springframework.http.ResponseEntity<com.notrika.gympin.common.finance.invoice.dto.InvoiceDto> com.notrika.gympin.controller.impl.finance.invoice.InvoiceControllerImpl.deleteBuyable(com.notrika.gympin.common.finance.invoice.param.InvoiceBuyableParam)": "حذف بلیط",
    "public org.springframework.http.ResponseEntity<com.notrika.gympin.common.purchased.purchasedSubscribe.dto.PurchasedSubscribeScannedDto> com.notrika.gympin.controller.impl.purchased.purchasedSubscribe.PurchasedSubscribeControllerImpl.addEntryMessage(com.notrika.gympin.common.purchased.purchasedSubscribe.param.EntryMessageParam)": "افزودن پیام به بلیط",
    "public org.springframework.http.ResponseEntity<com.notrika.gympin.common.user.user.dto.UserDto> com.notrika.gympin.controller.impl.user.UserControllerImpl.addUserRole(com.notrika.gympin.common.user.user.param.UserRoleUpdateParam)": "افزودن نقش به کاربر",
    "public org.springframework.http.ResponseEntity<com.notrika.gympin.common.user.user.dto.UserDto> com.notrika.gympin.controller.impl.user.UserControllerImpl.removeUserRole(com.notrika.gympin.common.user.user.param.UserRoleUpdateParam)": "حذف نقش کاربر",
    "public org.springframework.http.ResponseEntity<org.springframework.data.domain.Page<com.notrika.gympin.common.user.user.dto.UserDto>> com.notrika.gympin.controller.impl.user.UserControllerImpl.couchQuery(com.notrika.gympin.common.user.user.query.CoachQuery)": "دریافت مربیان",
    "public org.springframework.http.ResponseEntity<com.notrika.gympin.common.place.place.dto.PlaceDto> com.notrika.gympin.controller.impl.place.PlaceControllerImpl.deleteMultimedia(com.notrika.gympin.common.place.place.param.PlaceMultimediaParam)": "حذف تصویر",
    "public org.springframework.http.ResponseEntity<com.notrika.gympin.common.ticket.ticketCourse.dto.TicketCourseDto> com.notrika.gympin.controller.impl.ticket.ticketCourse.TicketCourseControllerImpl.addCourseActiveTimes(com.notrika.gympin.common.ticket.common.param.TicketActiveTimesParam)": "افزودن زمان به کلاس",
    "public org.springframework.http.ResponseEntity<com.notrika.gympin.common.ticket.ticketCourse.dto.TicketCourseDto> com.notrika.gympin.controller.impl.ticket.ticketCourse.TicketCourseControllerImpl.addSport(com.notrika.gympin.common.ticket.ticketCourse.param.TicketCourseSportParam)": "افزودن ورزش",
    "public org.springframework.http.ResponseEntity<com.notrika.gympin.common.ticket.ticketCourse.dto.TicketCourseDto> com.notrika.gympin.controller.impl.ticket.ticketCourse.TicketCourseControllerImpl.deleteSport(com.notrika.gympin.common.ticket.ticketCourse.param.TicketCourseSportParam)": "خذف ورزش",
    "public org.springframework.http.ResponseEntity<com.notrika.gympin.common.ticket.ticketCourse.dto.TicketCourseDto> com.notrika.gympin.controller.impl.ticket.ticketCourse.TicketCourseControllerImpl.changeTicketCourseStatus(com.notrika.gympin.common.ticket.ticketCourse.param.TicketCourseParam)": "تغببر وضعیت کلاس",
    "public org.springframework.http.ResponseEntity<com.notrika.gympin.common.ticket.ticketCourse.dto.TicketCourseDto> com.notrika.gympin.controller.impl.ticket.ticketCourse.TicketCourseControllerImpl.addCoach(com.notrika.gympin.common.ticket.ticketCourse.param.TicketCourseCoachParam)": "افزودن مربی",
    "public org.springframework.http.ResponseEntity<com.notrika.gympin.common.ticket.ticketCourse.dto.TicketCourseDto> com.notrika.gympin.controller.impl.ticket.ticketCourse.TicketCourseControllerImpl.deleteCoach(com.notrika.gympin.common.ticket.ticketCourse.param.TicketCourseCoachParam)": "حذف مربی",
    "public org.springframework.http.ResponseEntity<com.notrika.gympin.common.purchased.purchasedCourse.dto.PurchasedCourseDto> com.notrika.gympin.controller.impl.purchased.purchasedCourse.PurchasedCourseControllerImpl.addEnterToCourse(com.notrika.gympin.common.purchased.purchasedCourse.param.PurchasedCourseParam) throws java.lang.Exception": "افزودن ورود به بلیط",
    "public org.springframework.http.ResponseEntity<java.lang.Boolean> com.notrika.gympin.controller.impl.purchased.purchasedCourse.PurchasedCourseControllerImpl.enterRequest(com.notrika.gympin.common.purchased.purchasedCourse.param.PurchasedCourseParam) throws java.lang.Exception": "ثبت درخواست ورود",
    "public org.springframework.http.ResponseEntity<com.notrika.gympin.common.place.personnel.dto.PlacePersonnelDto> com.notrika.gympin.controller.impl.place.PlacePersonnelControllerImpl.deleteRole(com.notrika.gympin.common.place.personnel.param.PlacePersonnelParam)": "خذف نقش پرسنل مجموعه",
    "public org.springframework.http.ResponseEntity<java.lang.Boolean> com.notrika.gympin.controller.impl.user.AccountControllerImpl.RequestRegisterAdvice(com.notrika.gympin.common.user.user.param.RequestRegisterParam)": "درخواست ثبت نام مجموعه",
    "public org.springframework.http.ResponseEntity<com.notrika.gympin.common.place.place.dto.PlaceDto> com.notrika.gympin.controller.impl.place.PlaceControllerImpl.addMultimedia(com.notrika.gympin.common.place.place.param.PlaceMultimediaParam)": "افزودن تصویر",
    "public org.springframework.http.ResponseEntity<com.notrika.gympin.common.settings.userSettings.dto.UserSettingDto> com.notrika.gympin.controller.impl.user.UserControllerImpl.SetUserSettings(com.notrika.gympin.common.settings.userSettings.param.UserSettingParam)": "تغییر تنظیمات کاربر",
    "public org.springframework.http.ResponseEntity<com.notrika.gympin.common.user.user.dto.UserDto> com.notrika.gympin.controller.impl.user.UserControllerImpl.updateUserStatus(com.notrika.gympin.common.user.user.param.UserStatusParam)": "تغییر وضعیت کاربر",
    "public org.springframework.http.ResponseEntity<java.util.List<com.notrika.gympin.common.settings.service.dto.ServiceDto>> com.notrika.gympin.controller.impl.settings.service.ServiceControllerImpl.getUsersActive(com.notrika.gympin.common.settings.service.param.ServiceByDateParam)": "مشاهده کاربران فعال",
    "public org.springframework.http.ResponseEntity<com.notrika.gympin.common.ticket.ticketSubscribe.dto.TicketSubscribeDto> com.notrika.gympin.controller.impl.ticket.ticketSubscribe.TicketSubscribeControllerImpl.deleteCoach(com.notrika.gympin.common.ticket.ticketSubscribe.param.TicketSubscribeCoachParam)": "حذف مربی از عضویت",
    "public org.springframework.http.ResponseEntity<com.notrika.gympin.common.ticket.ticketSubscribe.dto.TicketSubscribeDto> com.notrika.gympin.controller.impl.ticket.ticketSubscribe.TicketSubscribeControllerImpl.addCoach(com.notrika.gympin.common.ticket.ticketSubscribe.param.TicketSubscribeCoachParam)": "افزودن مربی به عضویت",
    "public org.springframework.http.ResponseEntity<java.lang.Boolean> com.notrika.gympin.controller.impl.user.AccountControllerImpl.RequestRegisterCorporate(com.notrika.gympin.common.user.user.param.RequestRegisterParam)": "درخواست عضویت سازمان",
    "public org.springframework.http.ResponseEntity<java.lang.Boolean> com.notrika.gympin.controller.impl.user.AccountControllerImpl.RequestPublicMessage(com.notrika.gympin.common.user.user.param.RequestRegisterParam)":"پیام عمومی به جیم پین",
}
