import { useState } from 'react';
import { Input,Button, Alert, AlertIcon } from "@chakra-ui/react";
import useLogin from '../../hooks/useLogin';

const Login = () => {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
      });
      const {loading, error, login} = useLogin();
  return <>
    <Input placeholder="Email" fontsize={14} type="email"
            value={inputs.email}
            size={"sm"}
            onChange={(e)=> setInputs({...inputs,email:e.target.value})}
            />

            <Input placeholder="Password" fontsize={14} type="password"
              value={inputs.password}
              size={"sm"}
              onChange={(e)=> setInputs({...inputs,password:e.target.value})}
             /> 

      {error && (
        <Alert status="error" fontSize={13} p={2} borderRadius={4}>
          <AlertIcon fontSize={12} />
          {error.message}
        </Alert>
      )}
             <Button w={"full"} colorScheme="green" size={"sm"} fontsize={14} 
             onClick={()=> login(inputs)} isLoading={loading}>
             Log in
             </Button>
         

  </>
}

export default Login;
