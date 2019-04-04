function authorizationByAdmin(req, res, next) {
  // if (authenticationByUser) {
  // 	console.log(req.user.role);
  // 	req.user.role.map(role => {
  // 		if (req.user[0] === "admin") {
  // 			next();
  // 		} else if (req.user.role[0] === "user") {
  // 			// CRUD - Create - POST , Read - GET , Update - PUT , Destroy - DELETE
  // 			// Products
  // 			if (req.url == "/products") {
  // 				if (req.method == "GET") {
  // 					next();
  // 				} else {
  // 					res.status(403).send({
  // 						notice: "You are not authorized to access this route"
  // 					});
  // 				}
  // 			} else if (req.url == "/categories") {
  // 			}

  // 			// Categories
  // 		}
  // 	});
  // }
  const user = req.user;
  if (user.role[0] == "admin") {
    next();
  } else {
    res.status(403).send("auhtorized url you have no access to this url ");
  }
}
module.exports = { authorizationByAdmin };
