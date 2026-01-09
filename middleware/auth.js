const isAdmin = (req, res, next) => {
    const role = req.query.role;
    console.log("Role received:", role);
    if (role && role.toLowerCase() === 'admin') next();
    else return res.status(403).json({ message: "Admin access required" });
};

module.exports = { isAdmin };