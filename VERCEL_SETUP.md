# 🚀 Déploiement sur Vercel - Guide Complet

## ⚠️ Problème: `.env.local` n'est pas sur GitHub

**C'est NORMAL et SÉCURISÉ !** ✅

Le fichier `.env.local` contient des clés API secrètes et ne doit JAMAIS être publié sur GitHub.

---

## 🔧 Solution: Ajouter les variables d'environnement dans Vercel

### Étape 1: Déployer sur Vercel

1. Va sur [vercel.com](https://vercel.com)
2. Connecte-toi avec GitHub
3. Clique sur **"Add New Project"**
4. Importe le repository: `24259-a11y/chatbruti-ammar`
5. Clique sur **"Deploy"**

⚠️ **ATTENTION**: Le chatbot ne fonctionnera pas encore car la clé API manque!

---

### Étape 2: Ajouter la clé API dans Vercel

1. Dans ton projet Vercel, clique sur **"Settings"** ⚙️
2. Dans le menu de gauche, clique sur **"Environment Variables"**
3. Ajoute la variable suivante:

```
Name:  GROQ_API_KEY
Value: [ta clé API Groq ici - obtiens-la sur console.groq.com]
```

4. Sélectionne les environnements:
   - ✅ Production
   - ✅ Preview
   - ✅ Development

5. Clique sur **"Save"**

---

### Étape 3: Redéployer le projet

1. Va dans l'onglet **"Deployments"**
2. Clique sur les **3 points** (...) du dernier déploiement
3. Sélectionne **"Redeploy"**
4. Clique sur **"Redeploy"** pour confirmer

✅ **Maintenant le chatbot utilisera l'API Groq et donnera des réponses intelligentes!**

---

## 🎯 Vérification

Après le redéploiement:

1. Ouvre ton site Vercel
2. Pose une question au chatbot
3. Si ça marche, tu verras des réponses variées et intelligentes
4. Si ça ne marche pas, tu verras les réponses fallback (prédéfinies)

---

## 📸 Screenshots des Étapes

### 1. Environment Variables dans Vercel
```
Settings → Environment Variables → Add New
```

### 2. Configuration
```
Key:   GROQ_API_KEY
Value: [ta clé API]
Environment: Production ✅ Preview ✅ Development ✅
```

---

## 🔍 Dépannage

### Le chatbot donne toujours les mêmes réponses?

**Cause**: La clé API n'est pas configurée

**Solution**:
1. Vérifie que tu as bien ajouté `GROQ_API_KEY` dans Vercel
2. Vérifie qu'il n'y a pas d'espaces avant/après la clé
3. Redéploie le projet

### Comment vérifier si l'API fonctionne?

Regarde les logs Vercel:
1. Va dans **"Deployments"**
2. Clique sur le dernier déploiement
3. Clique sur **"Functions"** → `api/chat`
4. Tu verras les logs des requêtes

---

## ✨ Résultat Final

Une fois configuré correctement:
- ✅ Le chatbot répond avec l'IA Groq
- ✅ Réponses variées et intelligentes
- ✅ Support multilingue (FR/AR/EN)
- ✅ Personnalité absurde de Chat'bruti

---

## 📝 Notes Importantes

1. **Ne partage JAMAIS ta clé API publiquement**
2. **`.env.local` reste local** (pas sur GitHub)
3. **Variables d'environnement = dans Vercel** (pas dans le code)
4. **Gratuit**: Groq offre 14,400 requêtes/jour gratuitement

---

## 🎉 C'est tout !

Ton projet est maintenant déployé et fonctionnel sur Vercel! 🚀

URL de ton site: `https://chatbruti-ammar.vercel.app` (ou similaire)
