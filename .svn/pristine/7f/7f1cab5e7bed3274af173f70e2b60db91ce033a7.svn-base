/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50611
Source Host           : 127.0.0.1:3306
Source Database       : hycd

Target Server Type    : MYSQL
Target Server Version : 50611
File Encoding         : 65001

Date: 2016-06-12 14:52:01
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for bp_cust_ent_account_sum
-- ----------------------------
DROP TABLE IF EXISTS `bp_cust_ent_account_sum`;
CREATE TABLE `bp_cust_ent_account_sum` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `indexId` bigint(20)  DEFAULT NULL COMMENT '汇总表ID',
  `keyName` varchar(20) DEFAULT NULL COMMENT 'keyName',
  `keyId` varchar(20) DEFAULT NULL COMMENT 'keyId',
  `subTitle` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '二级科目名称',
  `title` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '一级科目名称',
  `startMoney` decimal(20,2)  DEFAULT NULL COMMENT '期初余额',
  `endMoney` decimal(20,2)  DEFAULT NULL COMMENT '期末余额',
  `createrId` bigint(20)  DEFAULT NULL COMMENT '创建人ID',
  `createrName` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '创建人',
  `updateDate` datetime DEFAULT NULL COMMENT '创建/更新时间',
   `subKey` varchar(100) DEFAULT NULL COMMENT 'subKey',
  `remark` text COLLATE utf8_bin DEFAULT NULL COMMENT '备注',
PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;