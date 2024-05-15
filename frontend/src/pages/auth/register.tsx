import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { REGISTER } from '@/requetes/mutations/auth.mutations';
import { RegisterInput } from '@/types/auth';

function Register() {
  const router = useRouter();
  const [register, { data, loading, error }] = useMutation(REGISTER);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formDataObject = Object.fromEntries(formData.entries());

    
    const data = formDataObject as unknown as RegisterInput;

   
    console.log('Form Data:', data);

    if (data.email && data.password && data.lastName && data.firstName && data.phone) {
      try {
        const response = await register({
          variables: {
            infos: {
              email: data.email,
              password: data.password,
              lastName: data.lastName,
              firstName: data.firstName,
              phone: data.phone
            }
          },
        });

        console.log('Response:', response);

        if (response.data) {
          router.push('/success');  
        }
      } catch (err) {
        console.error('Error registering user:', err);
      }
    } else {
      console.error('All fields are required');
    }
  };
return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Inscription</h1>
        <div>
          <input type="text" name="firstName" placeholder="Prénom" required />
        </div>
        <div>
          <input type="text" name="lastName" placeholder="Nom" required />
        </div>
        <div>
          <input type="email" name="email" placeholder="Indiquez votre email" required />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Indiquez votre mot de passe"
            required
          />
        </div>
        <div>
          <input type="tel" name="phone" placeholder="06..." required />
        </div>
        <input type="submit" value="S'inscrire" />
      </form>
      {loading && <p>Inscription en cours...</p>}
      {error && <p>Erreur lors de linscription : {error.message}</p>}
      {data && <p>Inscription réussie!</p>}
    </div>
  );
}

export default Register;