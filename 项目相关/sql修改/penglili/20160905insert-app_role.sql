ALTER TABLE `app_role`
ADD COLUMN `desks`  text CHARACTER SET utf8 COLLATE utf8_bin NULL COMMENT '该角色下个人桌面可以加载的功能' ;

ALTER TABLE `app_user`
ADD COLUMN `desks`  varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL COMMENT '用户桌面设置' ;



