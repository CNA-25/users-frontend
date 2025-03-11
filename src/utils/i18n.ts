import { useLangStore } from "@/stores/lang";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources: Record<string, { translation: Record<string, string> }> = {
	en: {
		translation: {
			login: "Login",
			register: "Register",
			profile: "Profile",
			myOrders: "My orders",
			logout: "Logout",
			updateUser: "Update your information",
			loadingUserData: "Loading user data...",
			updateUserButton: "Update information",
			deleteUserButton: "Delete your user",
			// Status messages
			loginSuccess: "Login successful!",
			loginFailed: "Failed to login successfully! Try again",
			registerSuccess: "Register successful!",
			registerFailed: "Failed to register successfully! Try again",
			// User update
			unauthorized: "Unauthorized. Please log in.",
			userIdError: "Failed to retrieve user ID.",
			userFetchError: "Error fetching user data",
			userUpdateSuccess: "User updated successfully!",
			userUpdateError: "An error occurred while updating user",
			passwordMismatch: "Passwords do not match.",
			deleteConfirm:
				"Are you sure you want to delete your account? This action is irreversible.",
			userDeleteSuccess: "User deleted successfully!",
			userDeleteError: "Error deleting user",
			// Form:
			name: "Name",
			email: "Email",
			phone: "Phone",
			dob: "Date of Birth",
			password: "Password",
			newPassword: "New password",
			retypePassword: "Retype password",
			noAccount: "No account? Register Here!",
			alreadyAccount: "Already have an account? Login here!",
			// Orders
			yourOrders: "Your orders",
			orderId: "Order ID",
			userId: "User ID",
			orderTime: "Order Time",
			orderAddress: "Order Address",
			orderPrice: "Order Price",
			// Order errors:
			noOrders: "You have no orders",
			// Products
			productId: "Product Id",
			productImage: "Product Image",
			productInfo: "Product Info",
			productQuantity: "Quantity",
			productPrice: "Price",
			productTotalPrice: "Total Price",
			country: "Country",
			category: "Category",
			description: "Description",
			itemCount: "item",
		},
	},
	fi: {
		translation: {
			login: "Kirjaudu sisään",
			register: "Rekisteröidy",
			profile: "Profiili",
			myOrders: "Omat tilaukset",
			logout: "Kirjaudu ulos",
			updateUser: "Päivitä tietosi",
			loadingUserData: "Ladataan käyttäjätietoja...",
			updateUserButton: "Päivitä tiedot",
			deleteUserButton: "Poista käyttäjäsi",
			// Tilaviestit
			loginSuccess: "Sisäänkirjautuminen onnistui!",
			loginFailed: "Sisäänkirjautuminen epäonnistui, yritä uudelleen",
			registerSuccess: "Rekisteröinti onnistui!",
			registerFailed: "Rekisteröinti epäonnistui! Yritä uudelleen",
			unauthorized: "Ei käyttöoikeutta. Kirjaudu sisään.",
			userIdError: "Käyttäjätunnusta ei voitu hakea.",
			userFetchError: "Virhe haettaessa käyttäjätietoja",
			userUpdateSuccess: "Käyttäjän tiedot päivitetty onnistuneesti!",
			userUpdateError: "Virhe päivittäessä käyttäjää",
			passwordMismatch: "Salasanat eivät täsmää.",
			deleteConfirm:
				"Haluatko varmasti poistaa tilisi? Tämä toiminto on peruuttamaton.",
			userDeleteSuccess: "Käyttäjä poistettu onnistuneesti!",
			userDeleteError: "Virhe käyttäjän poistossa",
			// Lomake:
			name: "Nimi",
			email: "Sähköposti",
			phone: "Puhelin",
			dob: "Syntymäaika",
			password: "Salasana",
			newPassword: "Uusi salasana",
			retypePassword: "Syötä salasana uudelleen",
			noAccount: "Ei tiliä? Rekisteröidy tästä!",
			alreadyAccount: "Onko sinulla jo tili? Kirjaudu tästä!",
			// Tilaukset
			yourOrders: "Tilauksesi",
			orderId: "Tilaus ID",
			userId: "Käyttäjä ID",
			orderTime: "Tilausaika",
			orderAddress: "Toimitusosoite",
			orderPrice: "Tilaushinta",
			// Tilausvirheet:
			noOrders: "Sinulla ei ole tilauksia",
			// Tuotteet
			productId: "Tuote ID",
			productImage: "Tuotekuva",
			productInfo: "Tuotetiedot",
			productQuantity: "Määrä",
			productPrice: "Hinta",
			productTotalPrice: "Kokonaishinta",
			country: "Maa",
			category: "Kategoria",
			description: "Kuvaus",
			itemCount: "kpl",
		},
	},
	sv: {
		translation: {
			login: "Logga in",
			register: "Registrera",
			profile: "Profil",
			myOrders: "Mina beställningar",
			logout: "Logga ut",
			updateUser: "Uppdatera din information",
			loadingUserData: "Laddar användardata...",
			updateUserButton: "Uppdatera information",
			deleteUserButton: "Radera din användare",
			// Statusmeddelanden
			loginSuccess: "Inloggning lyckades!",
			loginFailed: "Inloggning misslyckades, försök igen",
			registerSuccess: "Registrering lyckades!",
			registerFailed: "Registrering misslyckades! Försök igen",
			unauthorized: "Obehörig. Vänligen logga in.",
			userIdError: "Misslyckades med att hämta användar-ID.",
			userFetchError: "Fel vid hämtning av användardata",
			userUpdateSuccess: "Användaren uppdaterades framgångsrikt!",
			userUpdateError: "Ett fel uppstod vid uppdatering av användaren",
			passwordMismatch: "Lösenorden matchar inte.",
			deleteConfirm:
				"Är du säker på att du vill ta bort ditt konto? Denna åtgärd är oåterkallelig.",
			userDeleteSuccess: "Användaren raderades framgångsrikt!",
			userDeleteError: "Fel vid radering av användare",
			// Formulär:
			name: "Namn",
			email: "E-post",
			phone: "Telefon",
			dob: "Födelsedatum",
			password: "Lösenord",
			newPassword: "Nytt lösenord",
			retypePassword: "Skriv in lösenordet igen",
			noAccount: "Inget konto? Registrera här!",
			alreadyAccount: "Har du redan ett konto? Logga in här!",
			// Beställningar
			yourOrders: "Dina beställningar",
			orderId: "Beställnings-ID",
			userId: "Användar-ID",
			orderTime: "Beställningstid",
			orderAddress: "Leveransadress",
			orderPrice: "Beställningspris",
			// Beställningsfel:
			noOrders: "Du har inga beställningar",
			// Produkter
			productId: "Produkt ID",
			productImage: "Produktbild",
			productInfo: "Produktinformation",
			productQuantity: "Antal",
			productPrice: "Pris",
			productTotalPrice: "Totalpris",
			country: "Land",
			category: "Kategori",
			description: "Beskrivning",
			itemCount: "styck",
		},
	},
};

const { lang } = useLangStore.getState();

i18n.use(initReactI18next).init({
	resources,
	lng: lang,
	fallbackLng: "en",
	interpolation: { escapeValue: false },
});

export default i18n;
