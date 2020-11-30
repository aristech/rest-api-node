module.exports = function (req, res, next) {
  //

  if (req.user.role < 2) return res.status(403).send("Access denied.");

  next();
};

// function superAdminAuth() {
//   return (req, res, next) => {
//     console.log("role", req.user.role);
//     if (req.user.role !== 3) {
//       return res.status(403).send("Access denied.");
//     }
//     next();
//   };
// }

// function adminAuth() {
//   return (req, res, next) => {
//     if (req.user.role < 2) {
//       return res.status(403).send("Access denied.");
//     }
//     next();
//   };
// }
// function userAuth() {
//   return (req, res, next) => {
//     console.log("role", req.user.role);
//     if (!req.user.role >= 0) {
//       return res.status(403).send("Access denied.");
//     }
//     next();
//   };
// }

// module.exports = {
//   superAdminAuth,
//   adminAuth,
//   userAuth,
// };
