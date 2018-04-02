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
-- Table structure for bp_cust_ent_account_sum_index
-- ----------------------------
DROP TABLE IF EXISTS `bp_cust_ent_account_sum_index`;
CREATE TABLE `bp_cust_ent_account_sum_index` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `customerType` varchar(255) DEFAULT NULL COMMENT '客户类别',
  `customerId` bigint(20)  DEFAULT NULL COMMENT '客户ID',
  `year` varchar(20) DEFAULT NULL COMMENT 'year',
  `month` varchar(20) DEFAULT NULL COMMENT 'month',
  `startDate` datetime DEFAULT NULL COMMENT '开始日期',
   `endDate` datetime DEFAULT NULL COMMENT '结束日期',
  `createrId` bigint(20)  DEFAULT NULL COMMENT '创建人ID',
  `createrName` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '创建人',
  `updateDate` datetime DEFAULT NULL COMMENT '创建时间',
  `remark` text COLLATE utf8_bin DEFAULT NULL COMMENT '备注',
PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;