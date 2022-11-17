export const EnvConfiguration=()=>({
    mongodb:process.env.MONGODB,
    port: process.env.PORT,
    defaultLimit: +process.env.DEFAULT_LIMIT || 7
})