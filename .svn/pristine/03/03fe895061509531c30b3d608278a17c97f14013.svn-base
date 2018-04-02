ALTER TABLE `bp_product_parameter`
ADD COLUMN `yearModel`  int(3) NULL,
ADD COLUMN `monthModel`  int(2) NULL,
ADD COLUMN `headTailModel`  int(2) NULL COMMENT '还款模型 0：算头不算尾，1：算头又算尾' AFTER `monthModel` ;

ALTER TABLE `sl_smallloan_project`
ADD COLUMN `yearModel`  int(3) NULL ,
ADD COLUMN `monthModel`  int(2) NULL AFTER `yearModel`,
ADD COLUMN `headTailModel`  int(2) NULL COMMENT '还款模型 0：算头不算尾，1：算头又算尾' AFTER `monthModel` ;

ALTER TABLE `bp_fund_project`
ADD COLUMN `yearModel`  int(3) NULL ,
ADD COLUMN `monthModel`  int(2) NULL AFTER `yearModel`,
ADD COLUMN `headTailModel`  int(2) NULL COMMENT '还款模型 0：算头不算尾，1：算头又算尾' AFTER `monthModel` ;

-- ALTER TABLE `bp_product_parameter`
-- CHANGE COLUMN `accrual` `monthAccrualRate`  decimal(20,10) NULL DEFAULT NULL COMMENT '月化利率' AFTER `yearAccrualRate`;

-- ALTER TABLE `sl_smallloan_project`
-- CHANGE COLUMN `accrual` `monthAccrualRate`  decimal(20,10) NULL DEFAULT NULL COMMENT '月化利率' AFTER `yearAccrualRate`;

-- ALTER TABLE `bp_fund_project`
-- CHANGE COLUMN `accrual` `monthAccrualRate`  decimal(20,10) NULL DEFAULT NULL COMMENT '月化利率' AFTER `yearAccrualRate`;


ALTER TABLE `bp_product_parameter`
ADD COLUMN `sumAllDay`  int(6) NULL COMMENT '计息总天数';

ALTER TABLE `sl_smallloan_project`
ADD COLUMN `sumAllDay`  int(6) NULL COMMENT '计息总天数';  

ALTER TABLE `bp_fund_project`
ADD COLUMN `sumAllDay`  int(6) NULL COMMENT '计息总天数';



ALTER TABLE `bp_product_parameter`
ADD COLUMN `payaccrualTypePrincipal` varchar(30) NULL COMMENT '本金还款周期',
ADD COLUMN `dayOfEveryPeriodPrincipal` int(6) NULL COMMENT '本金自定义还款周期';

ALTER TABLE `sl_smallloan_project`
ADD COLUMN `payaccrualTypePrincipal`  varchar(30) NULL COMMENT '本金还款周期',
ADD COLUMN `dayOfEveryPeriodPrincipal` int(6) NULL COMMENT '本金自定义还款周期';  

ALTER TABLE `bp_fund_project`
ADD COLUMN `payaccrualTypePrincipal`  varchar(30) NULL COMMENT '本金还款周期',
ADD COLUMN `dayOfEveryPeriodPrincipal` int(6) NULL COMMENT '本金自定义还款周期';


ALTER TABLE `sl_fund_intent`
ADD COLUMN `interestDays`  integer(8) NULL;

-- 20160815
ALTER TABLE `bp_product_parameter`
ADD COLUMN `fixedAccrualRate` decimal(20,10) NULL COMMENT '利率固定金额',
ADD COLUMN `fixedManagementConsultingOfRate` decimal(20,10) NULL COMMENT '随期收费1固定金额',
ADD COLUMN `fixedFinanceServiceOfRate` decimal(20,10) NULL COMMENT '随期收费2固定金额';

ALTER TABLE `sl_smallloan_project`
ADD COLUMN `fixedAccrualRate` decimal(20,10) NULL COMMENT '利率固定金额',
ADD COLUMN `fixedManagementConsultingOfRate` decimal(20,10) NULL COMMENT '随期收费1固定金额',
ADD COLUMN `fixedFinanceServiceOfRate` decimal(20,10) NULL COMMENT '随期收费2固定金额';  

ALTER TABLE `bp_fund_project`
ADD COLUMN `fixedAccrualRate` decimal(20,10) NULL COMMENT '利率固定金额',
ADD COLUMN `fixedManagementConsultingOfRate` decimal(20,10) NULL COMMENT '随期收费1固定金额',
ADD COLUMN `fixedFinanceServiceOfRate` decimal(20,10) NULL COMMENT '随期收费2固定金额';

-- 20160816
ALTER TABLE `bp_product_parameter`
ADD COLUMN `overdueRateLoan` decimal(20,10) NULL COMMENT '逾期利率';

-- 20160817
ALTER TABLE `bp_product_parameter`
ADD COLUMN `isPrincipalByOneTimeCheck` integer(1) NULL COMMENT '一次性付本';

ALTER TABLE `sl_smallloan_project`
ADD COLUMN `isPrincipalByOneTimeCheck` integer(1) NULL COMMENT '一次性付本'; 

ALTER TABLE `bp_fund_project`
ADD COLUMN `isPrincipalByOneTimeCheck` integer(1) NULL COMMENT '一次性付本';






