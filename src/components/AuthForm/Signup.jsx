import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { 
  Button, 
  Input, 
  InputGroup, 
  InputRightElement, 
  Alert, 
  AlertIcon, 
  VStack 
} from '@chakra-ui/react';
import useSignUpWithEmailAndPassword from '../../hooks/useSignUpWithEmailAndPassword';

const Signup = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  // Extract loading and error correctly from the custom hook
  const { loading, error, signup } = useSignUpWithEmailAndPassword();

  // Handle input changes dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <VStack spacing={4} w="full" maxW="md">
      <Input 
        placeholder="Email" 
        fontSize={14} 
        type="email"
        name="email"
        value={inputs.email}
        size="sm"
        onChange={handleChange}
      />
      
      <Input 
        placeholder="Username" 
        fontSize={14} 
        type="text"
        name="username"
        value={inputs.username}
        size="sm"
        onChange={handleChange}
      />
      
      <Input 
        placeholder="Full Name" 
        fontSize={14} 
        type="text"
        name="fullName"
        value={inputs.fullName}
        size="sm"
        onChange={handleChange}
      />

      <InputGroup size="sm">
        <Input
          placeholder="Password"
          fontSize={14}
          type={showPassword ? "text" : "password"}
          name="password"
          value={inputs.password}
          onChange={handleChange}
        />
        <InputRightElement h="full">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>

      {error && (
        <Alert status="error" fontSize={13} p={2} borderRadius={4}>
          <AlertIcon fontSize={12} />
          {error.message}
        </Alert>
      )}

      <Button
        w="full"
        colorScheme="green"
        size="sm"
        fontSize={14}
        isLoading={loading}
        onClick={() => signup(inputs)}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
