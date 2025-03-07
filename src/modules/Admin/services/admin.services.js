import { Company, User } from "../../../DB/models/index.js";



//======================Ban or unbanned specific user======================//
export const banUser = async (req, res) => {
    const {Role} = req.loggedInUser
if (Role !== 'admin') return res.status(403).json({ msg: 'you are not authorized' })    
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'user not found' })
    user.bannedAt= Date.now()   
    await user.save()
    return res.status(200).json({ msg: 'user banned successfully' })
}
//==========================Ban or unbanned specific company========================//
export const banCompany = async (req, res) => {
    const {Role} = req.loggedInUser
if (Role !== 'admin') return res.status(403).json({ msg: 'you are not authorized' })    
    const { companyId } = req.body;
    const company = await Company.findById(companyId);
    if (!company) return res.status(404).json({ msg: 'company not found' })
    company.bannedAt= Date.now()
    await company.save()
    return res.status(200).json({ msg: 'company banned successfully' })
}

//==============================approvedByAdmin=============================//
export const approvedByAdmin = async (req, res) => {
    const {Role} = req.loggedInUser
if (Role !== 'admin') return res.status(403).json({ msg: 'you are not authorized' })    
    const { companyId } = req.body;
    const company = await Company.findById(companyId);
    if (!company) return res.status(404).json({ msg: 'company not found' })
    company.isApproved = true;
    await company.save()
    return res.status(200).json({ msg: 'company approved successfully' })
}
