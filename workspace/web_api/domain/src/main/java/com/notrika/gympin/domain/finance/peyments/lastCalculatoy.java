//
//
//    @Override
//    @Transactional
//    public Boolean settlementRequest(UserSettlementRequestParam param) {
//        PlaceEntity placeEntity = placeRepository.getById(param.getPlaceId());
//        if (param.getAmount().compareTo(placeEntity.getBalance()) > 0)
//            throw new RequestOverCreditLimit();
//        if (param.getAmount().compareTo(BigDecimal.valueOf(50000)) < 0)
//            throw new RequestUnderLimit();
//        placeEntity.setBalance(placeEntity.getBalance().subtract(param.getAmount()));
//        placeRepository.update(placeEntity);
//        corporatetransactionRepository.add(FinanceCorporateTransactionEntity.builder()
//                .place(placeEntity)
//                .balance(placeEntity.getBalance())
//                .amount(param.getAmount().negate())
//                .transactionStatus(TransactionStatus.REQUEST)
//                .transactionType(TransactionType.PLACE_SETTLEMENT)
//                .isChecked(false)
//                .bankPend(false)
//                .serial(java.util.UUID.randomUUID().toString())
//                .build());
//        return true;
//    }


//    @Override
//    @Transactional
//    public String setPaymentRequest(RequestIncreaseCorporateDepositParam param) {
//        var serial = java.util.UUID.randomUUID().toString();
//
//        if (param.getSelectedPaymentType() == null)
//            throw new unknownPaymentType();
//        if (param.getTransactionType() == null)
//            throw new unknownTransactionType();
//        if (!param.getTransactionType().toString().startsWith("CHARGE"))
//            throw new unsupportedTransactionType();
//
//        if (param.getSelectedPaymentType() == 80L) {
//
//            String callbackUrl = "https://api.gympin.ir/v1/Gateway/PersianCallbackMethod?ref=" + getStringType(param.getTransactionType());
//            var transaction = submitTransAction("پرداخت از درگاه پارسیان ", param, serial, true);
//            //Parsian
//            ClientSaleRequestData requestData = new ClientSaleRequestData();
//            requestData.setOrderId(GeneralUtil.UnifyOrderId(transaction.getId()));
//            requestData.setAmount(param.getAmount().longValue() * 10);
//            requestData.setCallBackUrl(callbackUrl);
//            requestData.setAdditionalData(serial);
//            UserEntity user = (UserEntity) GympinContextHolder.getContext().getEntry().get(GympinContext.USER_KEY);
//            requestData.setOriginator(user.getPhoneNumber());
//            requestData.setLoginAccount(loginAccount);
//            ClientSaleResponseData gatwayresult = null;
//            try {
//                gatwayresult = gatewayService.salePaymentRequest(requestData);
//            } catch (Exception e) {
//                throw new GatewayIsNotAvalable();
//            }
//            if (gatwayresult == null) {
//                throw new GatewayIsNotAvalable();
//            } else if (gatwayresult.getStatus() == 0 && gatwayresult.getToken() > 0) {
//                transaction.setDescription(transaction.getDescription() + " - توکن بانک " + gatwayresult.getToken());
//                corporatetransactionRepository.update(transaction);
//                return "https://pec.shaparak.ir/NewIPG/?token=" + gatwayresult.getToken();
//            } else if (gatwayresult.getMessage() != null) {
//                throw new BadRequestRunTimeMessage(gatwayresult.getMessage());
//            } else {
//                throw new GatewayIsNotAvalable();
//            }
//
//        } else if (param.getSelectedPaymentType() == 81L) {
//            var transaction = submitTransAction("پرداخت از درگاه -- ", param, serial, true);
//            return "http://localhost:3025/checkout/" + serial;
//        } else if (param.getSelectedPaymentType() == 82L) {
//            var transaction = submitTransAction("پرداخت از درگاه -- ", param, serial, true);
//            return "http://localhost:3025/checkout/" + serial;
//        } else if (param.getSelectedPaymentType() == 90L) {
//            var transaction = submitTransAction("پرداخت کارت به کارت با شماره تراکنش : " + param.getTransactionReference(), param, serial, false);
//            return serial.split("-")[0];
//        } else if (param.getSelectedPaymentType() == 95L) {
//            var transaction = submitTransAction("پرداخت بانکی با شماره تراکنش : " + param.getTransactionReference(), param, serial, false);
//            return serial.split("-")[0];
//        } else if (param.getSelectedPaymentType() == 98L) {
//            var transaction = submitTransAction("پرداخت چک با شماره سریال :" + param.getTransactionReference() + " و تاریخ :" + param.getChequeDate(), param, serial, false);
//            return serial.split("-")[0];
//        } else if (param.getSelectedPaymentType() == 99L) {
//            UserEntity user = (UserEntity) GympinContextHolder.getContext().getEntry().get(GympinContext.USER_KEY);
//            var transaction = submitTransAction("درخواست افزایش اعتبار از پنل توسط : " + user.getId() + " - " + user.getUsername(), param, serial, false);
//            return serial.split("-")[0];
//        }
//        throw new unknownPaymentType();
//
//    }

//    private TransactionEntity submitTransAction(String description, RequestIncreaseCorporateDepositParam param, String serial, Boolean bankPend) {
//
//        TransactionEntity transaction = new TransactionEntity();
//        transaction.setDescription(description);
//
//        transaction.setAmount(param.getAmount());
//        transaction.setTransactionStatus(TransactionStatus.REQUEST);
//        transaction.setSerial(serial);
//        transaction.setIsChecked(false);
//        transaction.setBankPend(bankPend);
//
//        if (param.getUserId() != null) {
//            UserEntity userEntity = userRepository.getById(param.getUserId());
//            transaction.setUser(userEntity);
//            transaction.setBalance(userEntity.getBalance());
//            transaction.setTransactionType(TransactionType.CHARGE_USER);
//        } else if (param.getPlaceId() != null) {
//            PlaceEntity placeEntity = placeRepository.getById(param.getPlaceId());
//            transaction.setPlace(placeEntity);
//            transaction.setBalance(placeEntity.getBalance());
//            transaction.setTransactionType(TransactionType.CHARGE_PLACE);
//        } else if (param.getCorporateId() != null) {
//            CorporateEntity corporateEntity = corporateService.getEntityById(param.getCorporateId());
//            transaction.setCorporate(corporateEntity);
//            transaction.setBalance(corporateEntity.getFinanceCorporate().getTotalDeposit());
//            transaction.setTransactionType(TransactionType.CHARGE_CORPORATE);
//        } else {
//            throw new unknownPaymentBuyer();
//        }
//
//        return transactionRepository.add(transaction);
//    }


//    @Override
//    @Transactional
//    public Boolean handCheckPayment(CheckPaymentParam param) {
//        List<TransactionEntity> transactionsList = transactionRepository.findAllBySerialAndDeletedFalse(param.getSerial());
//        if (transactionsList.isEmpty())
//            throw new TransactionNotFound();
//        if (transactionsList.size() > 1) {
//            throw new TransactionAlreadyChecked();
//        }
//        TransactionEntity transactionRequest = transactionsList.get(0);
//        TransactionEntity transactionAccepted = new TransactionEntity();
//        transactionAccepted.setAmount(transactionRequest.getAmount());
//        transactionAccepted.setIsChecked(false);
//        transactionAccepted.setBankPend(false);
//        transactionAccepted.setSerial(transactionRequest.getSerial());
//        transactionAccepted.setCorporate(transactionRequest.getCorporate());
//        transactionAccepted.setPlace(transactionRequest.getPlace());
//        transactionAccepted.setUser(transactionRequest.getUser());
//        transactionAccepted.setTransactionType(transactionRequest.getTransactionType());
//        transactionAccepted.setDescription(param.getDescription());
//        if (param.getAccept()) {
//            transactionAccepted.setTransactionStatus(TransactionStatus.PAYMENT_COMPLETE);
//            if (transactionRequest.getUser() != null) {
//                UserEntity userEntity = transactionRequest.getUser();
//                userEntity.setBalance(userEntity.getBalance().add(transactionRequest.getAmount()));
//                userRepository.update(userEntity);
//
//                transactionAccepted.setBalance(userEntity.getBalance());
//            } else if (transactionRequest.getPlace() != null) {
//                PlaceEntity placeEntity = transactionRequest.getPlace();
//                placeEntity.setBalance(placeEntity.getBalance().add(transactionRequest.getAmount()));
//                placeRepository.update(placeEntity);
//                transactionAccepted.setBalance(placeEntity.getBalance());
//            } else if (transactionRequest.getCorporate() != null) {
//                CorporateEntity corporateEntity = transactionRequest.getCorporate();
//                //todo fix this shit
////                corporateEntity.setBalance(corporateEntity.getBalance().add(transactionRequest.getAmount()));
//                corporateService.update(corporateEntity);
//                transactionAccepted.setBalance(corporateEntity.getFinanceCorporate().getTotalDeposit());
//            } else {
//                throw new unknownPaymentBuyer();
//            }
//        } else {
//            transactionAccepted.setTransactionStatus(TransactionStatus.PAYMENT_REJECTED);
//            if (transactionRequest.getUser() != null) {
//                transactionAccepted.setBalance(transactionRequest.getUser().getBalance());
//            } else if (transactionRequest.getPlace() != null) {
//                transactionAccepted.setBalance(transactionRequest.getPlace().getBalance());
//            } else if (transactionRequest.getCorporate() != null) {
//                transactionAccepted.setBalance(transactionRequest.getCorporate().getFinanceCorporate().getTotalDeposit());
//            } else {
//                throw new unknownPaymentBuyer();
//            }
//        }
//        transactionRepository.add(transactionAccepted);
//        return true;
//    }

//    @Override
//    @Transactional
//    public Boolean placeSetteling(@NonNull TransactionPlaceSettelingParam transactionParam) {
//        FinanceCorporateTransactionEntity transactionRequest = placeTransactionRepository.getById(transactionParam.getTransactionId());
//        placeTransactionRepository.add(FinanceCorporateTransactionEntity.builder()
//                .serial(transactionRequest.getSerial())
//                .transactionType(TransactionType.PLACE_SETTLEMENT)
//                .transactionStatus(TransactionStatus.PAYMENT_COMPLETE)
//                .place(transactionRequest.getPlace())
//                .balance(transactionRequest.getBalance())
//                .isChecked(false)
//                .description(transactionParam.getTransactionText())
//                .amount(transactionRequest.getAmount())
//                .build());
//        return true;
//    }

