export default {
  users: `
  INSERT INTO users(firstname,lastname,email,isadmin,password)      
  VALUES  ('Common','User','user@questioner.com',0,'$2a$10$/RvFN8CxFWnwXwH/CJYZ3.f69ZCWexo1yB9.WTJQyX3pmyhGuoW96'),
            ('Super','Admin','superadmin@questioner.com',1,'$2a$10$/RvFN8CxFWnwXwH/CJYZ3.f69ZCWexo1yB9.WTJQyX3pmyhGuoW96')
  `,
};
