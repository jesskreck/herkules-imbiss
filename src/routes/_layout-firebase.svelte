<script lang="ts">
    import "../app.scss";
    import { firebaseConfig } from "../lib/firebase";
    import { FirebaseApp } from 'sveltefire';
    import { initializeApp } from 'firebase/app';
    import { getFirestore } from 'firebase/firestore';
    import { getAuth } from 'firebase/auth';

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const firestore = getFirestore(app);
    const auth = getAuth(app);
</script>

<FirebaseApp {auth} {firestore}>
    <slot />
</FirebaseApp>