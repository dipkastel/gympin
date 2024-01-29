# RULE

    INSERT INTO user_role (id,role) VALUES (1,'CONTENT');
    INSERT INTO user_role (id,role) VALUES (2,'MARKET');
    INSERT INTO user_role (id,role) VALUES (3,'MANAGER');
    INSERT INTO user_role (id,role) VALUES (4,'ADMIN');
    INSERT INTO user_role (id,role) VALUES (5,'SUPER_ADMIN');
    INSERT INTO user_role (id,role) VALUES (6,'COACH');
    INSERT INTO user_role (id,role) VALUES (7,'PLACE_MANAGER');
    INSERT INTO user_role (id,role) VALUES (8,'PLACE_PERSONNEL');
    INSERT INTO user_role (id,role) VALUES (9,'USER');
    INSERT INTO user_role (id,role) VALUES (10,'CORPORATE_MANAGER');


# USER
    INSERT INTO finance_user(id,total_deposit) VALUES (1,0);
    INSERT INTO user (id,phone_number,username,user_role,user_group,user_status,finance_user_id) VALUES (1,'09126540027','ADMINISTRATOR','SUPER_ADMIN','ADMINISTRATION','ENABLED',1);

    INSERT INTO user_activation_code (id,phone_number,code,sender_id,user_id,is_deleted,expired_date) VALUES (1,'09126540027','$2a$10$5Va1z26qaCFwom2IAxbgYOavTPP4Q0DS8g17k0iOn8R1w0vII5wnq','0',1,0,CURRENT_TIMESTAMP());

#MULTIMEDIA CATEGORY

INSERT INTO manage_location(id, name, center_lat, center_lng, type) VALUES (1,'ایران',54.2727147,32.070052,'COUNTRY');
INSERT INTO manage_location(id, name, center_lat, center_lng, type,parent_id) values (2,'تهران',51.201698,35.415903,'STATE',1);
INSERT INTO manage_location(id, name, center_lat, center_lng, type,parent_id) values (3,'تهران',51.201698,35.415903,'CITY',2);
INSERT INTO manage_location(id, name, type,parent_id) values (4,'آبشار','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (5,'آبشار تهران','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (6,'آجودانیه','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (7,'آذربایجان','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (8,'آذری','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (9,'آرارات','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (10,'آرژانتین','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (11,'آسمان','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (12,'آشتیانی','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (13,'آهنگ','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (14,'ائمه اطهار','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (15,'اباذر','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (16,'ابراهیم‌آباد','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (17,'ابن بابویه','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (18,'ابوذر (منطقه ۱۵)','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (19,'اتابک','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (20,'اتحاد','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (21,'اختیاریه','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (22,'اراج','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (23,'ارامنه','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (24,'ارم','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (25,'ازگل','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (26,'استاد معین','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (27,'استخر','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (28,'اسفندیاری','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (29,'اسکندری','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (30,'افسریه','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (31,'اقدسیه','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (32,'اکباتان','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (33,'المهدی','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (34,'الهیه','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (35,'امامت','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (36,'امامزاده حسن(ع)','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (37,'امامزاده قاسم','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (38,'امام سجاد(ع)','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (39,'امانیه','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (40,'امیرآباد','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (41,'امیر بهادر','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (42,'امیریه','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (43,'امین حضور','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (44,'اندیشه (شهر زیبا)','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (45,'اوقاف','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (46,'اوین','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (47,'ایران','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (48,'ایرانشهر','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (49,'ایوانک','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (50,'باغ آذری','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (51,'باغ خزانه','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (52,'باغ رضوان','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (53,'باغ فردوس','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (54,'باغ فیض','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (55,'بریانک','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (56,'بلوار کشاورز','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (57,'بلورسازی','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (58,'بهار','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (59,'بهاران','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (60,'بهارستان','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (61,'بهجت‌آباد','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (62,'بهداشت','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (63,'بهمن یار','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (64,'بیسیم','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (65,'پاتریس لومومبا','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (66,'پاسداران','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (67,'پامنار','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (68,'پرستار','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (69,'پرواز','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (70,'پلیس','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (71,'پونک','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (72,'پیروزی','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (73,'تاکسیرانی','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (74,'تجریش','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (75,'تسلیحات','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (76,'توانیر','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (77,'توحید','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (78,'تولید دارو','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (79,'تهرانپارس شرقی','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (80,'تهرانپارس غربی','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (81,'تهران‌سر','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (82,'تهران‌نو','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (83,'تهران‌ویلا','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (84,'جابری','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (85,'جردن','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (86,'جلفا','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (87,'جلیلی','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (88,'جماران','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (89,'جمال‌زاده','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (90,'جمهوری','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (91,'جنت‌آباد جنوبی','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (92,'جنت‌آباد شمالی','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (93,'جنت‌آباد مرکزی','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (94,'جوادیه','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (95,'جوادیه تهرانپارس','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (96,'جوانمرد قصاب','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (97,'جهاد','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (98,'جی','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (99,'جیحون','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (100,'چهارصد دستگاه','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (101,'چیتگر','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (102,'چیذر','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (103,'حافظیه','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (104,'حسن‌آباد','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (105,'حسن‌آباد باقرفر','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (106,'حسین‌آباد','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (107,'حشمتیه','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (108,'حصار بوعلی','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (109,'حصارک','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (110,'حکمت','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (111,'حکیمیه','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (112,'حمزه‌آباد','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (113,'خاقانی','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (114,'خاک سفید','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (115,'خانی‌آباد','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (116,'خانی‌آباد نو','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (117,'خاوران','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (118,'خزانه','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (119,'خلیج فارس','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (120,'خواجه نصیر طوسی','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (121,'خواجه نظام الملک','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (122,'دارآباد','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (123,'دانشگاه تهران','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (124,'دانشگاه شریف','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (125,'دانشگاه علم و صنعت','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (126,'دبستان','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (127,'درب دوم','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (128,'دربند','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (129,'دردشت','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (130,'درکه','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (131,'دروازه شمیران','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (132,'دروس','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (133,'دریا','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (134,'دریاچه شهدای خلیج فارس','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (135,'دریان‌نو','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (136,'دزاشیب','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (137,'دکتر هوشیار','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (138,'دلگشا','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (139,'دولاب','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (140,'دولت‌آباد','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (141,'دولتخواه','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (142,'دهقان','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (143,'دهکده المپیک','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (144,'ده‌ونک','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (145,'دیلمان','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (146,'زاهد گیلانی','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (147,'زرکش','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (148,'زرگنده','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (149,'زعفرانیه','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (150,'زمزم','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (151,'زنجان','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (152,'زهتابی','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (153,'زیبادشت','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (154,'زینبیه','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (155,'سازمان آب','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (156,'سازمان برنامه','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (157,'سبلان','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (158,'سپهر','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (159,'ستارخان','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (160,'سرآسیاب دولاب','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (161,'سرآسیاب مهرآباد','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (162,'سرتخت','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (163,'سرخه حصار','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (164,'سرو آزاد','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (165,'سعادت‌آباد','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (166,'سعیدآباد','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (167,'سلامت','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (168,'سلسبیل','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (169,'سلیمانی','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (170,'سنگلج','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (171,'سوهانک','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (172,'سهروردی','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (173,'سیدخندان','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (174,'سیروس','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (175,'سیزده آبان','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (176,'شادآباد','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (177,'شادمهر','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (178,'شارق شرقی','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (179,'شاندیز','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (180,'شاهد','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (181,'شاهین','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (182,'شبیری','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (183,'شریف','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (184,'شریف‌آباد','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (185,'شکوفه','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (186,'شمس‌آباد','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (187,'شمشیری','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (188,'شمیران‌نو','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (189,'شوش','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (190,'شهادت','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (191,'شهرآرا','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (192,'شهران جنوبی','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (193,'شهران شمالی','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (194,'شهر زیبا','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (195,'شهرک آپادانا','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (196,'شهرک آزادی','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (197,'شهرک آسمان','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (198,'شهرک ابوذر','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (199,'شهرک استقلال','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (200,'شهرک امام خمینی','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (201,'شهرک امید','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (202,'شهرک امیرالمومنین','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (203,'شهرک انصار','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (204,'شهرک پاسداران','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (205,'شهرک پرواز','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (206,'شهرک تختی','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (207,'شهرک دانشگاه تهران','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (208,'شهرک دانشگاهی','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (209,'شهرک دریا','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (210,'شهرک راه‌آهن','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (211,'شهرک ژاندارمری','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (212,'شهرک سینمایی','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (213,'شهرک شریعتی','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (214,'شهرک شریفی','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (215,'شهرک شهید باقری','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (216,'شهرک صدرا','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (217,'شهرک طالقانی','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (218,'شهرک غرب','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (219,'شهرک غزالی','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (220,'شهرک فردوس','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (221,'شهرک فرهنگیان','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (222,'شهرک کوهسار','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (223,'شهرک کیانشهر','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (224,'شهرک گلها','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (225,'شهرک محلاتی','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (226,'شهرک مسلمین','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (227,'شهرک نفت (منطقه ۱)','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (228,'شهرک نفت (منطقه ۵)','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (229,'شهرک والفجر (منطقه ۶)','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (230,'شهرک ولیعصر','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (231,'شهید آوینی','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (232,'شهید اسدی','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (233,'شهید بروجردی','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (234,'شهید دستغیب','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (235,'شهید رجایی','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (236,'شیان','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (237,'شیخ هادی','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (238,'شیرازی','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (239,'شیوا','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (240,'صاحب الزمان','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (241,'صادقیه','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (242,'صالح‌آباد شرقی','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (243,'صد دستگاه','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (244,'صفا','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (245,'صفائیه (چشمه علی)','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (246,'طرشت','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (247,'طوس','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (248,'طیب','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (249,'ظفر','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (250,'ظهیرآباد','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (251,'عارف','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (252,'عباس‌آباد','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (253,'عبدالله‌آباد','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (254,'عبدل‌آباد','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (255,'علی‌آباد','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (256,'فاطمی','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (257,'فتح','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (258,'فدک','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (259,'فرحزاد','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (260,'فردوسی','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (261,'فرمانیه','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (262,'فرودگاه مهرآباد','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (263,'فلاح','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (264,'فیروزآبادی','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (265,'قاسم‌آباد','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (266,'قبا','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (267,'قزل قلعه','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (268,'قصر فیروزه ۱','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (269,'قصر فیروزه ۲','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (270,'قلمستان','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (271,'قلهک','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (272,'قنات‌کوثر','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (273,'قیام','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (274,'قیام‌دشت','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (275,'قیطریه','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (276,'امام حسین(ع)','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (277,'بازار','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (278,'کاروان','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (279,'کاشانک','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (280,'کاظم‌آباد','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (281,'کامرانیه','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (282,'کرمان','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (283,'کریم‌آباد','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (284,'سنایی','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (285,'کن','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (286,'کوثر','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (287,'کوهک','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (288,'کوی بیمه','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (289,'کوی فراز','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (290,'کوی فردوس','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (291,'کوی مهران','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (292,'کوی نوبنیاد','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (293,'کوی هفدهم شهریور','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (294,'گاندی','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (295,'گرگان','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (296,'گلاب دره','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (297,'گلچین','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (298,'گمرک','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (299,'گیشا (کوی نصر)','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (300,'لشکر','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (301,'لویزان','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (302,'مبارک‌آباد بهشتی','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (303,'مجیدآباد','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (304,'مجیدیه','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (305,'محمودیه','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (306,'مخصوص','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (307,'مدائن','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (308,'مرادآباد','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (309,'مرزداران','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (310,'مسعودیه','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (311,'مسگرآباد','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (312,'مشیریه','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (313,'مقدم','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (314,'ملک‌آباد','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (315,'منصوریه (پل سیمان)','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (316,'منیریه','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (317,'مولوی','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (318,'مهرآباد جنوبی','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (319,'میدان انقلاب','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (320,'میدان حر','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (321,'میدان ولیعصر','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (322,'میرداماد','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (323,'مینا','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (324,'مینابی','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (325,'نارمک','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (326,'نارمک جنوبی','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (327,'نازی‌آباد','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (328,'نبی اکرم(ص)','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (329,'نجات اللهی','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (330,'نصرت','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (331,'نظام‌آباد','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (332,'نعمت‌آباد','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (333,'نواب','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (334,'نیاوران','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (335,'نیرو هوایی','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (336,'نیلوفر','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (337,'وحیدیه','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (338,'وردآورد','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (339,'وصفنارد','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (340,'ولنجک','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (341,'ونک','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (342,'هاشم‌آباد','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (343,'هاشمی','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (344,'هروی','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (345,'هزارسنگ','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (346,'هفت چنار','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (347,'هفت حوض','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (348,'هوانیروز','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (349,'یاخچی‌آباد','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (350,'یافت‌آباد','REGION',3);
INSERT INTO manage_location(id, name, type,parent_id) values (351,'یوسف‌آباد','REGION',3);


#MULTIMEDIA CATEGORY

    INSERT INTO multimedia_category(id, name,arh,arw,maxh,maxw,minh,minw) VALUES (1,'تصاویر ورزش ها',1,1,300,300,300,300);
    INSERT INTO multimedia_category(id, name,arh,arw,maxh,maxw,minh,minw) VALUES (2,'تصاویر کاربران',1,1,800,800,300,300);
    INSERT INTO multimedia_category(id, name,arh,arw,maxh,maxw,minh,minw) VALUES (3,'تصاوبر مجموعه ها',2,3,800,1200,400,600);
    INSERT INTO multimedia_category(id, name,arh,arw,maxh,maxw,minh,minw) VALUES (4,'بنر ها و تصاویر تبلیغاتی',null,null,null,null,null,null);
    INSERT INTO multimedia_category(id, name,arh,arw,maxh,maxw,minh,minw) VALUES (5,'لوگو شرکت ها',1,1,800,800,300,300);
    INSERT INTO multimedia_category(id, name,arh,arw,maxh,maxw,minh,minw) VALUES (6,'تصاویر اسلایدر',1,3,null,null,null,null);
    INSERT INTO multimedia_category(id, name,arh,arw,maxh,maxw,minh,minw) VALUES (7,'تصاویر مطالب',1,2,1000,2000,400,800);

#SPORTS

INSERT INTO sport(id, launch_status, name ) VALUES ( 1,'LAUNCHED','آمادگی جسمانی');
INSERT INTO sport(id, launch_status, name ) VALUES ( 2,'LAUNCHED','اسب سواری');
INSERT INTO sport(id, launch_status, name ) VALUES ( 3,'LAUNCHED','اسکواش');
INSERT INTO sport(id, launch_status, name ) VALUES ( 4,'LAUNCHED','اسکی');
INSERT INTO sport(id, launch_status, name ) VALUES ( 5,'LAUNCHED','اسکیت');
INSERT INTO sport(id, launch_status, name ) VALUES ( 6,'LAUNCHED','ایروبیک');
INSERT INTO sport(id, launch_status, name ) VALUES ( 7,'LAUNCHED','بادی پامپ');
INSERT INTO sport(id, launch_status, name ) VALUES ( 8,'LAUNCHED','بادی جم');
INSERT INTO sport(id, launch_status, name ) VALUES ( 9,'LAUNCHED','باله');
INSERT INTO sport(id, launch_status, name ) VALUES ( 10,'LAUNCHED','بدمینتون');
INSERT INTO sport(id, launch_status, name ) VALUES ( 11,'LAUNCHED','بدنسازی');
INSERT INTO sport(id, launch_status, name ) VALUES ( 12,'LAUNCHED','بسکتبال');
INSERT INTO sport(id, launch_status, name ) VALUES ( 13,'LAUNCHED','بوکس');
INSERT INTO sport(id, launch_status, name ) VALUES ( 14,'LAUNCHED','بولینگ');
INSERT INTO sport(id, launch_status, name ) VALUES ( 15,'LAUNCHED','بیلیارد');
INSERT INTO sport(id, launch_status, name ) VALUES ( 16,'LAUNCHED','پارکور');
INSERT INTO sport(id, launch_status, name ) VALUES ( 17,'LAUNCHED','پاورلیفتینگ');
INSERT INTO sport(id, launch_status, name ) VALUES ( 18,'LAUNCHED','پرتاب وزنه');
INSERT INTO sport(id, launch_status, name ) VALUES ( 19,'LAUNCHED','پرش');
INSERT INTO sport(id, launch_status, name ) VALUES ( 20,'LAUNCHED','پیلاتس');
INSERT INTO sport(id, launch_status, name ) VALUES ( 21,'LAUNCHED','تای چی');
INSERT INTO sport(id, launch_status, name ) VALUES ( 22,'LAUNCHED','تکواندو');
INSERT INTO sport(id, launch_status, name ) VALUES ( 23,'LAUNCHED','تنیس');
INSERT INTO sport(id, launch_status, name ) VALUES ( 24,'LAUNCHED','تی آر ایکس');
INSERT INTO sport(id, launch_status, name ) VALUES ( 25,'LAUNCHED','تیر اندازی');
INSERT INTO sport(id, launch_status, name ) VALUES ( 26,'LAUNCHED','جوجیتسو');
INSERT INTO sport(id, launch_status, name ) VALUES ( 27,'LAUNCHED','جودو');
INSERT INTO sport(id, launch_status, name ) VALUES ( 28,'LAUNCHED','جیت کان دو');
INSERT INTO sport(id, launch_status, name ) VALUES ( 29,'LAUNCHED','دفاع شخصی');
INSERT INTO sport(id, launch_status, name ) VALUES ( 30,'LAUNCHED','دو');
INSERT INTO sport(id, launch_status, name ) VALUES ( 31,'LAUNCHED','دوچرخه‌ سواری');
INSERT INTO sport(id, launch_status, name ) VALUES ( 32,'LAUNCHED','زومبا');
INSERT INTO sport(id, launch_status, name ) VALUES ( 33,'LAUNCHED','ژیمناستیک');
INSERT INTO sport(id, launch_status, name ) VALUES ( 34,'LAUNCHED','شطرنج');
INSERT INTO sport(id, launch_status, name ) VALUES ( 35,'LAUNCHED','شمشیر بازی');
INSERT INTO sport(id, launch_status, name ) VALUES ( 36,'LAUNCHED','شنا');
INSERT INTO sport(id, launch_status, name ) VALUES ( 37,'LAUNCHED','صخره‌ نوردی');
INSERT INTO sport(id, launch_status, name ) VALUES ( 38,'LAUNCHED','فوتبال');
INSERT INTO sport(id, launch_status, name ) VALUES ( 39,'LAUNCHED','فوتسال');
INSERT INTO sport(id, launch_status, name ) VALUES ( 40,'LAUNCHED','قایقرانی');
INSERT INTO sport(id, launch_status, name ) VALUES ( 41,'LAUNCHED','کاراته');
INSERT INTO sport(id, launch_status, name ) VALUES ( 42,'LAUNCHED','کراس فیت');
INSERT INTO sport(id, launch_status, name ) VALUES ( 43,'LAUNCHED','کشتی');
INSERT INTO sport(id, launch_status, name ) VALUES ( 44,'LAUNCHED','کونگ فو');
INSERT INTO sport(id, launch_status, name ) VALUES ( 45,'LAUNCHED','کوهنوردی');
INSERT INTO sport(id, launch_status, name ) VALUES ( 46,'LAUNCHED','کیک بوکسینگ');
INSERT INTO sport(id, launch_status, name ) VALUES ( 47,'LAUNCHED','کیوکشین');
INSERT INTO sport(id, launch_status, name ) VALUES ( 48,'LAUNCHED','گلف');
INSERT INTO sport(id, launch_status, name ) VALUES ( 49,'LAUNCHED','ماساژ');
INSERT INTO sport(id, launch_status, name ) VALUES ( 50,'LAUNCHED','موی تای');
INSERT INTO sport(id, launch_status, name ) VALUES ( 51,'LAUNCHED','واترپولو');
INSERT INTO sport(id, launch_status, name ) VALUES ( 52,'LAUNCHED','والیبال');
INSERT INTO sport(id, launch_status, name ) VALUES ( 53,'LAUNCHED','ورزش باستانی');
INSERT INTO sport(id, launch_status, name ) VALUES ( 54,'LAUNCHED','وزنه‌برداری');
INSERT INTO sport(id, launch_status, name ) VALUES ( 55,'LAUNCHED','ووشو');
INSERT INTO sport(id, launch_status, name ) VALUES ( 56,'LAUNCHED','هندبال');
INSERT INTO sport(id, launch_status, name ) VALUES ( 57,'LAUNCHED','یوگا');

#SETTINGS

    INSERT INTO manage_settings(id,setting_description,setting_key,setting_type,setting_value) values (1,'صفحه اصلی انتخاب شده برای اپلیکیشن Android','ANDROID_HOMEPAGE_ID','ANDROID','1');
    INSERT INTO manage_settings(id,setting_description,setting_key,setting_type,setting_value) values (2,'صفحه اصلی انتخاب شده برای اپلیکیشن iOS','IOS_HOMEPAGE_ID','IOS','1');
    INSERT INTO manage_settings(id,setting_description,setting_key,setting_type,setting_value) values (3,'صفحه اصلی انتخاب شده برای اپلیکیشن PWA','WEB_APP_HOMEPAGE_ID','WEB_APP','1');
    INSERT INTO manage_settings(id,setting_description,setting_key,setting_type,setting_value) values (4,'صفحه اصلی انتخاب شده برای اپلیکیشن PWA-Places','WEB_MASTER_HOMEPAGE_ID','WEB_MASTER','1');
    INSERT INTO manage_settings(id,setting_description,setting_key,setting_type,setting_value) values (5,'صفحه اصلی انتخاب شده برای اپلیکیشن PWA-Corporates','WEB_CORPORATE_HOMEPAGE_ID','WEB_CORPORATE','1');
    INSERT INTO manage_settings(id,setting_description,setting_key,setting_type,setting_value) values (6,'شماره ثابت ارسال پیامک برای تست','SMS_FIX_NUMBER','GENERAL','-----');

# article category

    INSERT INTO article_category(id,name) values (1,'تمرینات ورزشی');
    INSERT INTO article_category(id,name) values (2,'تغذیه ورزشی');
    INSERT INTO article_category(id,name) values (3,'پزشکی ورزشی');
    INSERT INTO article_category(id,name) values (4,'ورزش های قدرتی');
    INSERT INTO article_category(id,name) values (5,'مراقبت های ورزشی');
    INSERT INTO article_category(id,name) values (6,'ورزش های آبی');
    INSERT INTO article_category(id,name) values (7,'اخبار ورزشی');
    INSERT INTO article_category(id,name) values (8,'ورزش های هوازی');
    INSERT INTO article_category(id,name) values (9,'مسابقات ورزشی');
    INSERT INTO article_category(id,name) values (10,'ورزش های تکنیکی');
    INSERT INTO article_category(id,name) values (11,'ورزش های گروهی');
    INSERT INTO article_category(id,name) values (12,'تجهیزات ورزشی');








#HomePage
    #Destinations
    #TODO ADD Description for how it used and what can do with datas

    INSERT INTO home_page_destinations(id, name,description) VALUES (1,'PLACES','برای مشخص کردن فیلتر از دیتا استفاده میشود');
    INSERT INTO home_page_destinations(id, name,description) VALUES (2,'SPORTS','');
    INSERT INTO home_page_destinations(id, name,description) VALUES (3,'OUTERBROWSER','url در دیتا');
    INSERT INTO home_page_destinations(id, name,description) VALUES (4,'INNERBROWSER','url در دیتا');
    INSERT INTO home_page_destinations(id, name,description) VALUES (5,'USERLIST','url در دیتا');
    INSERT INTO home_page_destinations(id, name,description) VALUES (6,'PROFILE','username در دیتا');
    INSERT INTO home_page_destinations(id, name,description) VALUES (7,'CONTENTS','contentId در دیتا');
    INSERT INTO home_page_destinations(id, name,description) VALUES (8,'DISCOUNTS','placeId در دیتا');
    INSERT INTO home_page_destinations(id, name,description) VALUES (9,'SINGLECONTENT','');
    INSERT INTO home_page_destinations(id, name,description) VALUES (10,'SINGLEDISCOUNT','');
    INSERT INTO home_page_destinations(id, name,description) VALUES (11,'INVITEFRIENDS','');
    INSERT INTO home_page_destinations(id, name,description) VALUES (12,'SURVEYLIST','');
    INSERT INTO home_page_destinations(id, name,description) VALUES (13,'LOGOUT','');
    INSERT INTO home_page_destinations(id, name,description) VALUES (14,'SUBSCRIBES','');

    #place Options

    INSERT INTO place_option(id, name,weight) VALUES (1,'هواسازی',6);
    INSERT INTO place_option(id, name,weight) VALUES (2,'سقف بلند',7);
    INSERT INTO place_option(id, name,weight) VALUES (3,'مربی',5);
    INSERT INTO place_option(id, name,weight) VALUES (4,'بوفه و کافی شاپ',6);
    INSERT INTO place_option(id, name,weight) VALUES (5,'دوش و حمام',8);
    INSERT INTO place_option(id, name,weight) VALUES (6,'اتاق ماساژ',2);
    INSERT INTO place_option(id, name,weight) VALUES (7,'پارکینگ',4);
    INSERT INTO place_option(id, name,weight) VALUES (8,'در خیابان اصلی',4);
    INSERT INTO place_option(id, name,weight) VALUES (9,'کمد ( لاکر ) امن',10);
    INSERT INTO place_option(id, name,weight) VALUES (10,'سونا',5);
    INSERT INTO place_option(id, name,weight) VALUES (11,'حوضچه آب سرد',5);
    INSERT INTO place_option(id, name,weight) VALUES (12,'جکوزی',5);
    INSERT INTO place_option(id, name,weight) VALUES (13,'نگهداری از کودک',2);
    INSERT INTO place_option(id, name,weight) VALUES (14,'بخش هوازی جدا',3);
    INSERT INTO place_option(id, name,weight) VALUES (15,'پزشک در مجموعه',3);
    INSERT INTO place_option(id, name,weight) VALUES (16,'رستوران',1);
    INSERT INTO place_option(id, name,weight) VALUES (17,'فروشگاه',1);
    INSERT INTO place_option(id, name,weight) VALUES (18,'فضای سبز',2);
    INSERT INTO place_option(id, name,weight) VALUES (19,'زمین چمن',2);
    INSERT INTO place_option(id, name,weight) VALUES (20,'سرویس بهداشتی عمومی',9);


    #Types

    INSERT INTO home_page_type(id, type, name, description, can_be_parent) value (1,'CLICKABLE_TITLE','تیتر کلیک دار','یک تیتر ساده با امکان کلیک',false);
    INSERT INTO home_page_type_entity_elements(home_page_type_entity_id, elements) values (1,'Title');
    INSERT INTO home_page_type_entity_elements(home_page_type_entity_id, elements) values (1,'Destination');

    INSERT INTO home_page_type(id, type, name, description, can_be_parent) value (2,'TITLE','تیتر بدون کلیک','یک تیتر ساده بدون امکان کلیک',false);
    INSERT INTO home_page_type_entity_elements(home_page_type_entity_id, elements) values (2,'Title');

    INSERT INTO home_page_type(id, type, name, description, can_be_parent) value (3,'SLIDER','اسلایدر','مجموعه ای که اسلاید ها در آن قرار میگیرد',true);

    INSERT INTO home_page_type(id, type, name, description, can_be_parent) value (4,'SLIDE','اسلاید','آیتم زیرمجموعه برای اسلایدر',false);
    INSERT INTO home_page_type_entity_elements(home_page_type_entity_id, elements) values (4,'Multimedia');
    INSERT INTO home_page_type_entity_elements(home_page_type_entity_id, elements) values (4,'Destination');

    INSERT INTO home_page_type(id, type, name, description, can_be_parent) value (5,'CLICKABLE_BANNER','بنر کلیکی','یک بنر با امکان کلیک',false);
    INSERT INTO home_page_type_entity_elements(home_page_type_entity_id, elements) values (5,'Destination');
    INSERT INTO home_page_type_entity_elements(home_page_type_entity_id, elements) values (5,'Multimedia');

    INSERT INTO home_page_type(id, type, name, description, can_be_parent) value (6,'BANNER','بنر ساده','یک بنر بدون امکان کلیک',false);
    INSERT INTO home_page_type_entity_elements(home_page_type_entity_id, elements) values (6,'Multimedia');

    INSERT INTO home_page_type(id, type, name, description, can_be_parent) value (7,'USER_LIST','لیست کاربران','مجموعه ای که آیتم کاربر در آن قرار میگیرد',true);

    INSERT INTO home_page_type(id, type, name, description, can_be_parent) value (8,'USER_ITEM','آیتم کاربر','زیر مجموعه لیست کاربران با امکان کلیک',false);
    INSERT INTO home_page_type_entity_elements(home_page_type_entity_id, elements) values (8,'Title');
    INSERT INTO home_page_type_entity_elements(home_page_type_entity_id, elements) values (8,'Destination');
    INSERT INTO home_page_type_entity_elements(home_page_type_entity_id, elements) values (8,'Multimedia');

    INSERT INTO home_page_type(id, type, name, description, can_be_parent) value (9,'SINGLE_USER','تک کاربر','یک کاربر برای نمایش کاربر برنده اصلی یا جایی که لازم است یک کاربر معرفی شود',false);
    INSERT INTO home_page_type_entity_elements(home_page_type_entity_id, elements) values (9,'Title');
    INSERT INTO home_page_type_entity_elements(home_page_type_entity_id, elements) values (9,'Destination');
    INSERT INTO home_page_type_entity_elements(home_page_type_entity_id, elements) values (9,'Multimedia');

    INSERT INTO home_page_type(id, type, name, description, can_be_parent) value (10,'CONTENT_LIST','لیست مطالب','لیستی که آیتم های مطلب در آن قرار میکیرد',true);

    INSERT INTO home_page_type(id, type, name, description, can_be_parent) value (11,'CONTENT_ITEM','آیتم مطلب','تک آیتم زیر مجموعه لیست مطالب معرفی کننده یک مطلب از سایت یا ... است',false);
    INSERT INTO home_page_type_entity_elements(home_page_type_entity_id, elements) values (11,'Title');
    INSERT INTO home_page_type_entity_elements(home_page_type_entity_id, elements) values (11,'Description');
    INSERT INTO home_page_type_entity_elements(home_page_type_entity_id, elements) values (11,'Destination');
    INSERT INTO home_page_type_entity_elements(home_page_type_entity_id, elements) values (11,'Multimedia');

    INSERT INTO home_page_type(id, type, name, description, can_be_parent) value (12,'SINGLE_CONTENT','تک مطلب','مطلب تکی در لیست',false);
    INSERT INTO home_page_type_entity_elements(home_page_type_entity_id, elements) values (12,'Title');
    INSERT INTO home_page_type_entity_elements(home_page_type_entity_id, elements) values (12,'Description');
    INSERT INTO home_page_type_entity_elements(home_page_type_entity_id, elements) values (12,'Destination');
    INSERT INTO home_page_type_entity_elements(home_page_type_entity_id, elements) values (12,'Multimedia');

    INSERT INTO home_page_type(id, type, name, description, can_be_parent) value (13,'DISCOUNT_LIST','لیست تخفیف ها','آیتم های تخفیف در این لیست قرار میگیرد',true);

    INSERT INTO home_page_type(id, type, name, description, can_be_parent) value (14,'DISCOUNT_ITEM','آیتم تخفیف','آیتم زیر مجموعه لیست تخفیف',false);
    INSERT INTO home_page_type_entity_elements(home_page_type_entity_id, elements) values (14,'Title');
    INSERT INTO home_page_type_entity_elements(home_page_type_entity_id, elements) values (14,'Description');
    INSERT INTO home_page_type_entity_elements(home_page_type_entity_id, elements) values (14,'Destination');
    INSERT INTO home_page_type_entity_elements(home_page_type_entity_id, elements) values (14,'Multimedia');

    INSERT INTO home_page_type(id, type, name, description, can_be_parent) value (15,'SINGLE_DISCOUNT','تخفیف تکی','آیتم تخفیف تکی ',false);
    INSERT INTO home_page_type_entity_elements(home_page_type_entity_id, elements) values (15,'Title');
    INSERT INTO home_page_type_entity_elements(home_page_type_entity_id, elements) values (15,'Description');
    INSERT INTO home_page_type_entity_elements(home_page_type_entity_id, elements) values (15,'Destination');
    INSERT INTO home_page_type_entity_elements(home_page_type_entity_id, elements) values (15,'Multimedia');

# first main page
    INSERT INTO home_page_item(id,title) VALUES (1,'صفحه اول همه اپلیکیشن ها');
    INSERT INTO home_page_item(id,title,priority,type,parent_id) VALUES (2,'خوش آمد',1,"TITLE",1);
# finance gateways
    INSERT INTO finance_gateway(id,name,gateway_type,description) VALUES (1,'درگاه پارسیان','BANK_PORTAL',null);
    INSERT INTO finance_gateway(id,name,gateway_type,description) VALUES (2,'کارت به کارت','CARD_TRANSFER','شماره کارت جهت واریز مبلغ 6221061225406448 به نام پیشکامان داده نوتریکا');
    INSERT INTO finance_gateway(id,name,gateway_type,description) VALUES (3,'پرداخت بانکی','BANK_TRANSFER','مبالغ از طریق باجه بانک به حساب : 88548550505 بانک پارسیان با شماره شبای : 540540840450 در وجه پیشکامان داده نوتریکا');
    INSERT INTO finance_gateway(id,name,gateway_type,description) VALUES (4,'چک','CHEQUE','چک باید در وجه پیشکامان داده نوتریکا به شماره ثبت 885215 ');
    INSERT INTO finance_application_gateway(id,application,gateway_id,is_default) VALUES (1,'WEBAPP',1,true);
    INSERT INTO finance_application_gateway(id,application,gateway_id,is_default) VALUES (2,'WEBAPP',2,false);
    INSERT INTO finance_application_gateway(id,application,gateway_id,is_default) VALUES (3,'WEBCORPORATE',1,true);
    INSERT INTO finance_application_gateway(id,application,gateway_id,is_default) VALUES (4,'WEBCORPORATE',2,false);
    INSERT INTO finance_application_gateway(id,application,gateway_id,is_default) VALUES (5,'WEBCORPORATE',3,false);

