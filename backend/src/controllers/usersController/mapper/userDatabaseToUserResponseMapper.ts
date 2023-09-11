import { UserDatabase } from "../dto/UserDatabase";
import { UserResponse } from "../dto/UserResponse";



export default function userDatabaseToUserResponseMapper(userDatabase: UserDatabase): UserResponse{
    const userResponse: UserResponse = {
        id: userDatabase.id,
        email: userDatabase.email,
        name: userDatabase.name,
        phone: userDatabase.phone,
        photo: userDatabase.phone,
        position: userDatabase.position.name,
        position_id: userDatabase.position.id
    }
    
    return userResponse
}