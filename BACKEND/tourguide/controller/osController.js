const os=require('os');

module.exports.getosinfo=(rea,res)=>{
    try{
        const osInformation={
            hostname:os.hostname(),
            type : os.type(),
            platform:os.platform(),
        }
        if(!osInformation){
            throw new Error("No information found");
        }
    res.status(200).json(osInformation);

    }catch(error){
    res.status(500).json({message:error.message});
}
  
  }