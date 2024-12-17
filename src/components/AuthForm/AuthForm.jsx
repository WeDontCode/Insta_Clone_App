import { Box, Image, Flex, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import GoogleAuth from "./GoogleAuth";
import Login from "./Login";
import Signup from "./Signup";

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <>
            <Box border={'1px solid gray'} borderRadius={4} padding={5}>
                <VStack spacing={4}>
                    <Image src='/logo.png' h={26} cursor={"pointer"} alt="Instagram" />
                    
                    {isLogin ? <Login /> : <Signup />}
                    
                </VStack>
            </Box>

            <Box border={"1px solid gray"} borderRadius={4} padding={5}> 
                <Flex alignItems={"center"} justifyContent={"center"}>
                    <Box>
                        {isLogin ? "Don't have an account? " : "Already have an account?"}
                    </Box>
                    <Box onClick={() => setIsLogin(!isLogin)} color={"blue.600"} cursor={"pointer"}>
                        {isLogin ? "Sign up" : "Log in"}
                    </Box>
                </Flex>
            </Box>
        </>
    );
};

export default AuthForm;
