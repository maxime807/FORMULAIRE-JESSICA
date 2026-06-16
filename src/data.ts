/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CategoryItem } from "./types";

export const categoriesData: CategoryItem[] = [
  {
    id: "avant",
    number: 1,
    title: "Avant l'achat",
    emoji: "1⃣",
    iconName: "ShoppingBag",
    description: "Questions récurrentes d'acheteurs potentiels avant de finaliser leur commande (personnalisation, délais, réductions, livraison, etc.)",
    questions: [
      {
        id: "avant-1",
        number: 1,
        text: "Est-il possible de personnaliser cet article ?",
        conditions: [
          {
            label: "Si la personnalisation est possible",
            template: "Bonjour [nom du client],\n\nOui, je propose des personnalisations pour cet article. 🎨\n\nPouvez-vous me préciser ce que vous souhaitez (par exemple, couleur, taille, ajout d’un texte) ?\nJe vérifierai si cela est réalisable et je vous donnerai tous les détails."
          },
          {
            label: "Si la personnalisation n'est pas possible",
            template: "Bonjour [nom du client],\n\nMerci pour votre question ! 😊\n\nMalheureusement, je ne propose pas de personnalisation pour cet article. Il est conçu dans un format unique afin de garantir sa qualité et son style.\n\nSi vous cherchez une alternative, je peux vous conseiller un autre produit de ma boutique."
          }
        ]
      },
      {
        id: "avant-2",
        number: 2,
        text: "Quand puis-je recevoir ma commande si je commande aujourd’hui ?",
        template: "Bonjour [nom du client],\n\nMerci pour votre intérêt ! Si vous commandez aujourd’hui, votre colis sera expédié sous [délai, ex. 2 jours ouvrés] et devrait arriver autour du [date estimée]. 📬\n\nCependant, il est possible que [le service postal] prenne parfois du retard, notamment pendant les périodes chargées.\n\nSi c’est une commande urgente, je vous invite à prendre ce risque en considération. À quelle date avez-vous besoin de recevoir votre commande ? Cela me permettra de vous conseiller au mieux."
      },
      {
        id: "avant-3",
        number: 3,
        text: "Quel produit me recommandez-vous pour [besoin spécifique] ?",
        template: "Bonjour [nom du client],\n\nMerci pour votre question ! Pour vous conseiller au mieux, pourriez-vous m’en dire un peu plus sur vos attentes ? Par exemple :\n- Quel style ou design vous attire le plus ?\n- Quelle est l’utilisation prévue pour cet article (cadeau, décoration, usage personnel) ?\n- Avez-vous une couleur ou un matériau préféré ?\n\nEn fonction de vos réponses, je pourrai vous recommander le produit le plus adapté à vos envies. 😊"
      },
      {
        id: "avant-4",
        number: 4,
        text: "Pouvez-vous m’en dire plus sur [nom du produit] ?",
        template: "Bonjour [nom du client],\n\nMerci pour votre intérêt pour [nom du produit] ! Voici quelques détails : \n\n✨ Matériau : [détail du matériau]\n📐 Dimensions : [dimensions]\n💡 Utilisation principale : [explication simple]\n\nSi vous avez besoin de précisions supplémentaires ou souhaitez vérifier un détail spécifique, je suis là pour vous répondre. 😊"
      },
      {
        id: "avant-5",
        number: 5,
        text: "Pouvez-vous créer un article unique selon mes idées ?",
        conditions: [
          {
            label: "Si c'est possible mais sous conditions",
            template: "Bonjour [nom du client],\n\nMerci pour votre demande ! Je réalise des créations sur mesure avec plaisir et serais ravie d’échanger sur votre projet. 🌟\n\nCependant, je ne reproduis pas des créations existantes afin de garantir des pièces authentiques et uniques à chaque client.\n\nPouvez-vous me décrire vos envies ? Par exemple :\n- Le style ou l’ambiance que vous imaginez\n- Les couleurs ou matériaux qui vous inspirent\n- L’utilisation prévue pour cet article\n\nJe reviendrai vers vous rapidement avec des propositions adaptées. 😊"
          },
          {
            label: "Si cela n'est pas possible",
            template: "Bonjour [nom du client],\n\nMerci pour votre intérêt et votre demande. Malheureusement, je ne propose pas de créations sur mesure. Chaque pièce de ma boutique est pensée et conçue comme une création unique. 😊\n\nJe vous invite à parcourir ma boutique, où vous trouverez peut-être une création qui correspond à vos envies.\n\nSi vous avez besoin d’aide pour choisir ou des questions, je suis là pour vous conseiller avec plaisir !"
          }
        ]
      },
      {
        id: "avant-6",
        number: 6,
        text: "Pouvez-vous me faire une réduction ?",
        template: "Bonjour [nom du client],\n\nMerci de m’avoir contactée et pour l’intérêt que vous portez à mes créations faites à la main ! ✨\n\nMalheureusement, je ne peux pas offrir de réduction. Chaque pièce est réalisée avec soin et beaucoup de temps pour garantir une qualité exceptionnelle. Mes prix sont fixés pour refléter la valeur de ce travail artisanal tout en restant accessibles.\n\n🎁 Cependant, pour vous remercier de votre intérêt, je suis ravie de vous offrir un code de réduction de [xx%] sur votre première commande avec le code [xxxx]. J’espère que cela vous encouragera à découvrir mes créations.\n\nN’hésitez pas à revenir vers moi si vous avez d’autres questions. Merci encore pour votre message et à bientôt !"
      },
      {
        id: "avant-7",
        number: 7,
        text: "Pouvez-vous m’offrir un produit gratuit ?",
        template: "Bonjour [nom du client],\n\nMerci de m’avoir contactée et pour l’intérêt que vous portez à mes créations faites à la main !\n\nJe comprends votre demande, mais je ne peux malheureusement pas offrir de produits gratuits. Chaque création nécessite un investissement important en matériaux, temps et savoir-faire. Mes prix sont pensés pour refléter cette valeur.\n\nCela dit, je propose régulièrement des offres spéciales et des promotions. Si vous souhaitez en être informée, je vous invite à suivre ma boutique ou à vous inscrire à ma newsletter. ✉️\n\nJe reste à votre disposition pour toute autre question. Merci encore pour votre message et votre compréhension."
      },
      {
        id: "avant-8",
        number: 8,
        text: "Pouvez-vous expédier ma commande en un délai plus court ?",
        template: "Bonjour [nom du client],\n\nMerci de votre intérêt pour mes créations ! Je comprends que vous avez une demande spécifique concernant le délai d’expédition, mais malheureusement, cela n’est pas possible. 📦\n\nChaque produit est [raison spécifique, ex. fait à la main, personnalisé], ce qui nécessite un certain temps de fabrication. Mon objectif est de garantir la meilleure qualité avant l’expédition.\n\n📦 La date la plus tôt à laquelle je pourrai expédier votre commande est le [date]. Une fois envoyée, la livraison prend généralement [nombre de jours] en moyenne.\n\nSi vous avez d’autres questions ou inquiétudes, je suis à votre disposition pour vous aider. Merci encore pour votre compréhension et votre intérêt pour mon travail. 😊"
      },
      {
        id: "avant-9",
        number: 9,
        text: "Pouvez-vous me mettre cet article de côté ?",
        conditions: [
          {
            label: "Réponse oui",
            template: "Bonjour [nom du client],\n\nMerci de votre message ! Je peux tout à fait mettre cet article de côté pour vous. ⭐\n\nJe vais le réserver pendant [nombre de jours] afin de vous laisser le temps de finaliser votre achat. Passé ce délai, il sera remis en vente.\n\nN’hésitez pas à me tenir informée rapidement pour que je puisse vous le garder sans souci. Merci encore pour votre intérêt et à très bientôt ! 😊"
          },
          {
            label: "Relance (article de côté depuis trop longtemps)",
            template: "Bonjour [nom du client],\n\nMerci de votre intérêt pour [nom de l’article]. Je voulais simplement vous rappeler que vous m’aviez demandé de réserver cet article pour vous. ⏳\n\nComme d’autres personnes sont également intéressées, je ne pourrai le conserver de côté que jusqu’à [date précise]. Si vous souhaitez finaliser votre achat, merci de me le faire savoir avant cette date.\n\nJe reste disponible si vous avez des questions. Merci pour votre compréhension, et j’espère avoir de vos nouvelles rapidement ! 😊"
          },
          {
            label: "Réponse non",
            template: "Bonjour [nom du client],\n\nMerci de votre message et pour votre intérêt dans [nom de l’article]. 😊\n\nMalheureusement, je ne peux pas mettre cet article de côté.\n\nLes réservations ne sont pas possibles pour garantir que tous les clients aient les mêmes chances d’acheter les articles disponibles.\n\nSi vous souhaitez finaliser votre achat rapidement, je vous conseille de passer commande dès maintenant pour être sûr(e) que l’article soit encore disponible. Merci de votre compréhension et à très bientôt !"
          }
        ]
      },
      {
        id: "avant-10",
        number: 10,
        text: "Cet article est-il fait à la main ?",
        conditions: [
          {
            label: "Réponse oui",
            template: "Bonjour [nom du client],\n\nMerci pour votre question ! Oui, cet article est entièrement fait à la main. ✨\n\nChaque pièce est créée avec soin et passion, en utilisant [matériaux, techniques, ou détails uniques]. Mon objectif est de vous offrir un produit de qualité, unique, et qui reflète tout le savoir-faire artisanal.\n\nSi vous avez d’autres questions ou souhaitez plus de détails sur le processus de fabrication, n’hésitez pas à me le demander. Je serai ravie de vous répondre !"
          },
          {
            label: "Réponse non",
            template: "Bonjour [nom du client],\n\nMerci pour votre question ! 😊 Cet article n’est pas fait à la main, mais il est sélectionné avec soin pour garantir une qualité irréprochable.\n\nSi vous cherchez des créations faites à la main, je vous invite à explorer d’autres produits dans ma boutique. J’ai plusieurs articles uniques qui sont fabriqués artisanalement.\n\nN’hésitez pas à me dire ce que vous recherchez, je serai ravie de vous orienter !"
          }
        ]
      },
      {
        id: "avant-11",
        number: 11,
        text: "Que se passe-t-il si la taille ne me convient pas ?",
        conditions: [
          {
            label: "Retour ou échange possible (produit non personnalisé)",
            template: "Bonjour [nom du client],\n\nMerci pour votre intérêt pour [nom du produit] ! Pour être sûr(e) de choisir la bonne taille, je vous recommande de suivre ces étapes simples : 📏\n\n💡 [Décrivez les étapes de mesure, exemple : \"Prenez vos mesures avec un mètre-ruban, et reportez-vous au guide des tailles disponible dans la description.\"]\n\nSi malgré tout, la taille commandée ne vous convient pas, vous pouvez me retourner l’article dans les 14 jours suivant sa réception. Je serai ravie de procéder à un échange pour une autre taille du même produit.\n\n⚠️ À noter : Les frais de retour restent à votre charge dans ce cas.\n\nSi vous avez des questions supplémentaires, n’hésitez pas à me contacter. Je suis là pour vous aider ! 😊"
          },
          {
            label: "Pas de retour ni d’échange (commande personnalisée)",
            template: "Bonjour [nom du client],\n\nMerci pour votre intérêt pour [nom du produit] ! Pour être sûr(e) que la taille corresponde parfaitement, je vous conseille de [décrire les étapes de mesure, ex. : \"prendre vos mesures avec un mètre-ruban et vérifier le guide des tailles dans la description\"]. 📏\n\n💡 Comme cet article est personnalisé selon vos spécifications, il ne peut malheureusement pas être retourné ni échangé, conformément à nos conditions générales de vente.\n\nJe reste à votre disposition pour répondre à toutes vos questions avant votre achat afin de garantir votre satisfaction. Merci pour votre compréhension ! 😊"
          }
        ]
      },
      {
        id: "avant-12",
        number: 12,
        text: "Pouvez-vous me proposer une réduction si j’achète plusieurs articles ?",
        conditions: [
          {
            label: "Réduction possible",
            template: "Bonjour [nom du client],\n\nMerci pour votre message et pour l’intérêt que vous portez à mes créations ! Je suis ravie d’apprendre que vous souhaitez commander plusieurs articles. 🌟\n\nEn guise de remerciement, je peux vous proposer une réduction de [pourcentage] sur votre commande à partir de [nombre] articles.\n\nSi vous souhaitez procéder, faites-le-moi savoir et je créerai un lien personnalisé avec le prix ajusté pour finaliser votre commande. Merci encore pour votre confiance, et je reste à votre disposition si vous avez d’autres questions !"
          },
          {
            label: "Réduction non possible",
            template: "Bonjour [nom du client],\n\nMerci pour votre message et pour l’intérêt que vous portez à mes créations ! 😊\n\nJe comprends votre demande, mais mes prix sont déjà fixés au plus juste pour refléter la qualité et le soin apportés à chaque pièce. Je ne peux donc pas proposer de réduction supplémentaire, même pour plusieurs articles.\n\nCependant, si vous avez des questions ou besoin de conseils pour finaliser votre commande, je suis là pour vous aider avec plaisir. Merci encore pour votre compréhension et votre intérêt pour mon travail !"
          }
        ]
      },
      {
        id: "avant-13",
        number: 13,
        text: "Combien de temps faut-il pour réaliser une commande personnalisée ?",
        template: "Bonjour [nom du client],\n\nMerci pour votre message et pour votre intérêt dans mes créations personnalisées ! 🎨\n\nLe délai moyen pour une commande sur mesure est de [nombre] jours ouvrés, selon la complexité du projet.\n\nSi vous avez une date précise en tête, faites-le-moi savoir pour que je puisse vérifier si cela est réalisable. Merci encore pour votre confiance ! 😊"
      },
      {
        id: "avant-14",
        number: 14,
        text: "Pouvez-vous inclure un message cadeau avec ma commande ?",
        template: "Bonjour [nom du client],\n\n🎁 Oui, je peux inclure un message cadeau personnalisé avec votre commande.\n\nMerci de me transmettre le texte que vous souhaitez ajouter, et je veillerai à ce qu’il soit joliment présenté. Si vous avez d’autres questions, je reste à votre disposition. 😊"
      }
    ]
  },
  {
    id: "pendant",
    number: 2,
    title: "Pendant l'achat",
    emoji: "2⃣",
    iconName: "CreditCard",
    description: "Questions techniques liées à la validation de la commande, aux codes promos, à l'interface Etsy ou au panier d'achat",
    questions: [
      {
        id: "pendant-1",
        number: 1,
        text: "Je n’arrive pas à finaliser ma commande sur Etsy, que faire ?",
        template: "Bonjour [nom du client],\n\nJe suis désolée d’apprendre que vous rencontrez un problème pour finaliser votre commande sur Etsy. 🛒\n\n💡 Voici quelques étapes pour tenter de résoudre ce souci :\n- Essayez de passer la commande en utilisant un autre navigateur (comme Google Chrome ou Firefox) ou un autre appareil.\n- Vérifiez que votre connexion internet est stable.\n- Assurez-vous que vos informations de paiement sont correctes et à jour sur votre compte Etsy.\n\n✉️ Si le problème persiste, je vous invite à contacter le service client Etsy via leur page d’aide [lien vers l’aide Etsy], car je n’ai pas accès à leurs outils de gestion de paiement.\n\nDe mon côté, je reste disponible pour vous accompagner si besoin. Merci pour votre patience et votre intérêt pour mes créations ! 😊"
      },
      {
        id: "pendant-2",
        number: 2,
        text: "Mon code promo ne fonctionne pas, pouvez-vous m’aider ?",
        template: "Bonjour [nom du client],\n\nMerci de m’avoir signalé ce problème ! 💡\n\nVoici quelques points à vérifier :\n- Assurez-vous que le code promo est correctement orthographié.\n- Vérifiez que le code est encore valide (date de fin ou conditions spécifiques indiquées dans l’offre).\n- Assurez-vous que le code s’applique bien aux articles de votre panier (parfois, les promotions excluent certains produits ou catégories).\n\nSi tout semble correct et que le problème persiste, pourriez-vous me transmettre le code promo concerné ? Je vérifierai de mon côté. 🙏\n\nMerci de votre patience, et je suis là pour vous aider à finaliser votre commande !"
      },
      {
        id: "pendant-3",
        number: 3,
        text: "Comment puis-je appliquer mon code promo sur Etsy ?",
        template: "Bonjour [nom du client],\n\nMerci pour votre intérêt ! Voici les étapes pour appliquer votre code promo sur Etsy : 🎫\n\n1️⃣ Allez dans votre panier sur Etsy.\n2️⃣ Cliquez sur \"Appliquer un code promo\" situé sous le bouton \"Finaliser ma commande\".\n3️⃣ Saisissez le code promo dans la case prévue à cet effet, puis cliquez sur \"Appliquer\".\n4️⃣ Vous verrez alors le prix ajusté avec la réduction.\n\nSi vous rencontrez un souci ou avez des questions, n’hésitez pas à me contacter. Je suis là pour vous aider ! 😊"
      },
      {
        id: "pendant-4",
        number: 4,
        text: "Pouvez-vous inclure un message personnalisé et faire un emballage cadeau ?",
        conditions: [
          {
            label: "Oui, c'est possible",
            template: "Bonjour [nom du client],\n\nMerci pour votre intérêt pour [nom du produit] ! Je serais ravie de personnaliser votre commande avec un message et un emballage cadeau. 🎁\n\nVoici comment procéder :\n1️⃣ Dans votre panier, cochez l'option \"Cette commande est un cadeau\".\n2️⃣ Ajoutez l'option \"Emballage cadeau\" à votre commande. [À noter : ce service inclut des frais supplémentaires ou ce service est offert.]\n3️⃣ Pour le message personnalisé, vous pouvez écrire un texte de [nombre de mots maximum] dans la case prévue à cet effet sur la page du panier.\n\nVotre commande sera préparée avec soin pour être prête à offrir.\n\nSi vous avez d’autres questions ou besoins spécifiques, n’hésitez pas à me contacter. Je suis là pour vous aider !"
          },
          {
            label: "Non, ce n'est pas possible",
            template: "Bonjour [nom du client],\n\nMerci pour votre intérêt pour [nom du produit] ! Malheureusement, je ne propose pas d’emballage cadeau ni de messages personnalisés pour le moment. 🌸\n\nCette décision me permet de maintenir des prix abordables et de gérer efficacement mes commandes, tout en garantissant la qualité de chaque article.\n\nSi vous avez d’autres questions ou besoin d’aide pour votre commande, je reste à votre disposition. Merci pour votre compréhension, et à très bientôt !"
          }
        ]
      },
      {
        id: "pendant-5",
        number: 5,
        text: "J’ai ajouté des articles dans mon panier, mais ils ne s’affichent plus.",
        template: "Bonjour [nom du client],\n\nMerci pour votre message ! Il peut arriver que des articles ne restent pas enregistrés dans le panier pour les raisons suivantes : 🛒\n\n1️⃣ L’article est en rupture de stock.\n2️⃣ Vous n’étiez pas connecté(e) à votre compte Etsy au moment où vous l’avez ajouté.\n\nJe vous invite à vérifier si l’article est toujours disponible dans ma boutique. Si c’est le cas, n’hésitez pas à l’ajouter à nouveau à votre panier en vous connectant à votre compte.\n\nSi vous avez besoin d’aide, je suis là pour vous accompagner ! 😊"
      },
      {
        id: "pendant-6",
        number: 6,
        text: "J’ai plusieurs articles de différentes boutiques dans mon panier, mais je veux commander uniquement chez vous. Comment faire ?",
        template: "Bonjour [nom du client],\n\nMerci pour votre intérêt dans mes créations ! Voici les étapes à suivre pour finaliser votre commande uniquement dans ma boutique sur Etsy : 🛍️\n\n1️⃣ Allez dans votre panier sur Etsy.\n2️⃣ Sous l’article de ma boutique, cliquez sur \"Valider la commande uniquement pour cette boutique\".\n3️⃣ Suivez les étapes pour finaliser votre achat.\n\nSi vous rencontrez un problème ou avez besoin d’aide supplémentaire, je suis là pour vous accompagner !"
      }
    ]
  },
  {
    id: "apres",
    number: 3,
    title: "Après l'achat",
    emoji: "3⃣",
    iconName: "PackageCheck",
    description: "Gestion des commandes après validation (suivi de livraison, retards, retours, remboursements, avis et litiges)",
    questions: [
      {
        id: "apres-1",
        number: 1,
        text: "Où en est ma commande ?",
        template: "Bonjour [nom du client],\n\nMerci pour votre message et pour votre commande ! Votre colis a été expédié le [date]. 📦\n\nVoici votre numéro de suivi : [numéro de suivi]. Vous pouvez suivre son acheminement via ce lien : [lien vers le suivi].\n\nSi vous avez d’autres questions ou besoin d’aide avec le suivi, je reste à votre disposition ! 😊"
      },
      {
        id: "apres-2",
        number: 2,
        text: "Mon colis n’est pas encore arrivé, est-ce normal ?",
        conditions: [
          {
            label: "Problème de livraison : Délais dans les temps",
            template: "Bonjour [nom du client],\n\nMerci pour votre message ! Selon le suivi de votre commande, votre colis est en cours d’acheminement et reste dans les délais normaux. 📦\n\nLes livraisons prennent généralement [nombre] jours ouvrés. Si vous n’avez pas reçu votre colis d’ici [date], n’hésitez pas à me recontacter pour que je puisse vérifier auprès du transporteur.\n\nJe reste à votre disposition pour toute autre question. Merci pour votre patience et à bientôt !"
          },
          {
            label: "Problème de livraison : Délais légèrement rallongés",
            template: "Bonjour [nom du client],\n\nMerci pour votre message ! Je suis désolée d’apprendre que votre colis n’est pas encore arrivé. Il semble que la livraison prenne un peu plus de temps que prévu. 📜\n\n💡 Parfois, les délais peuvent être légèrement rallongés en raison de [raisons possibles : périodes chargées, retards postaux, etc.]. Selon le suivi, votre colis est toujours en cours d’acheminement.\n\nJe vous invite à patienter encore quelques jours (jusqu’à [date]). Si vous ne l’avez toujours pas reçu d’ici là, n’hésitez pas à me recontacter pour que je fasse les vérifications nécessaires auprès du transporteur. Merci pour votre compréhension !"
          },
          {
            label: "Problème de livraison : Délais largement dépassés",
            template: "Bonjour [nom du client],\n\nMerci pour votre message. Je suis désolée d’apprendre que votre colis n’est toujours pas arrivé. Les délais indiqués sont maintenant largement dépassés, et je vais immédiatement prendre contact avec le transporteur pour clarifier la situation. ⚠️\n\n💡 Pendant que j’enquête de mon côté, pourriez-vous vérifier auprès de votre bureau de poste local ou avec vos voisins si le colis a pu être déposé à un autre endroit ?\n\nJe reviendrai vers vous dès que j’aurai des nouvelles. Si le colis est perdu ou retourné à l’expéditeur, je vous proposerai une solution adaptée (remplacement ou remboursement). Merci de votre patience et de votre compréhension ! 😊"
          }
        ]
      },
      {
        id: "apres-3",
        number: 3,
        text: "J’ai reçu un produit cassé/endommagé je veux un remboursement !",
        template: "Bonjour [nom du client],\n\nJe suis désolée d’apprendre que votre article est arrivé endommagé. Je prends cela très au sérieux et vais faire le nécessaire pour régler ce problème. 💔\n\n💡 Pour m’aider à résoudre cela rapidement, pourriez-vous m’envoyer :\n- Une photo montrant l’article endommagé.\n- Une photo de l’emballage, si possible.\n\nDès réception des photos, je vous proposerai une solution : remplacement ou remboursement, selon votre préférence. Merci pour votre compréhension !"
      },
      {
        id: "apres-4",
        number: 4,
        text: "Je n'ai pas reçu le bon produit, pouvez-vous m'aider ?",
        template: "Bonjour [nom du client],\n\nJe suis vraiment désolée de constater que vous n'avez pas reçu le bon article. 📦\n\n💡 Pour m’aider, pourriez-vous m’envoyer une photo de l’article reçu ainsi que votre numéro de commande ?\n\nJe m’assurerai ensuite de vous envoyer le bon produit le plus rapidement possible. Si vous souhaitez retourner l’article incorrect, je vous fournirai une étiquette de retour. Merci de votre compréhension et de votre patience ! 😊"
      },
      {
        id: "apres-5",
        number: 5,
        text: "Je souhaite retourner un article, comment faire ?",
        conditions: [
          {
            label: "Retour accepté (article non personnalisé, dans les délais)",
            template: "Bonjour [nom du client],\n\nMerci pour votre message. Vous pouvez retourner votre article dans un délai de 14 jours après réception, conformément à nos conditions de vente. Les frais de retour sont à votre charge. 📦\n\nVeuillez noter que l’article doit être retourné dans un état neuf et dans son emballage d’origine.\n\n💡 Pour initier un retour, merci de :\n- Me communiquer quel article de votre commande vous souhaitez retourner.\n- Indiquer sur papier libre votre numéro de commande et le joindre au colis.\n- Emballer soigneusement l'article pour éviter tout dommage pendant le transport.\n\nUne fois l’article reçu, je procéderai au remboursement dans un délai de [nombre] jours ouvrés.\n\nSi vous avez des questions, je suis là pour vous accompagner. 😊"
          },
          {
            label: "Retour refusé (article personnalisé)",
            template: "Bonjour [nom du client],\n\nMerci pour votre message. Malheureusement, les retours ne sont pas acceptés pour les articles personnalisés, comme précisé dans nos conditions de vente. 🌸\n\nChaque pièce personnalisée est réalisée sur commande et ne peut être revendue.\n\nJe reste disponible si vous avez des questions ou besoin d’une assistance supplémentaire. Merci pour votre compréhension et à bientôt !"
          },
          {
            label: "Retour refusé (délai dépassé)",
            template: "Bonjour [nom du client],\n\nMerci pour votre message. Malheureusement, le délai de retour de 14 jours après réception est dépassé, et je ne peux plus accepter le retour. ⌛\n\nJe comprends votre déception, mais cette politique est essentielle pour garantir une gestion équitable pour tous mes clients.\n\nSi vous avez des questions ou besoin d’aide, je suis là pour vous répondre avec plaisir. Merci pour votre compréhension !"
          }
        ]
      },
      {
        id: "apres-6",
        number: 6,
        text: "Puis-je échanger mon article contre un autre modèle ?",
        template: "Bonjour [nom du client],\n\nMerci pour votre message ! Les échanges sont possibles dans un délai de 14 jours après réception de votre commande, conformément à nos conditions de vente. 🔄\n\nVeuillez noter que :\n- L’article doit être retourné dans un état neuf et dans son emballage d’origine.\n- Les frais de retour sont à votre charge.\n\nPour initier un échange, merci de suivre ces étapes :\n1️⃣ Me communiquer quel article de votre commande vous souhaitez échanger ainsi que le modèle souhaité en échange.\n2️⃣ Indiquer sur papier libre votre numéro de commande et le joindre au colis.\n3️⃣ Emballer soigneusement l’article pour éviter tout dommage pendant le transport.\n\nUne fois l’article reçu et vérifié, je procéderai à l’envoi du nouveau modèle. Si le nouvel article a un prix différent :\n- Prix plus élevé : Je vous indiquerai comment régler la différence.\n- Prix plus bas : Je vous rembourserai la différence.\n\nSi vous avez des questions ou besoin d’aide, je reste à votre disposition. Merci pour votre confiance et à bientôt ! 😊"
      },
      {
        id: "apres-7",
        number: 7,
        text: "Je n'ai pas reçu mon colis, mais le suivi indique qu’il a été livré.",
        template: "Bonjour [nom du client],\n\nMerci pour votre message. Je suis désolée d’apprendre que vous n’avez pas reçu votre colis, même si le suivi indique qu’il a été livré. 📬\n\nVoici quelques étapes à suivre pour tenter de le localiser :\n1️⃣ Vérifiez auprès de vos voisins ou de votre concierge si quelqu’un a réceptionné le colis pour vous.\n2️⃣ Contactez votre bureau de poste local avec le numéro de suivi pour obtenir plus d’informations.\n\nSi vous ne trouvez pas le colis après ces vérifications, faites-le-moi savoir pour que nous puissions envisager une solution ensemble [remplacement ou remboursement, si applicable]. Merci pour votre compréhension ! 😊"
      },
      {
        id: "apres-8",
        number: 8,
        text: "Puis-je annuler ma commande ?",
        conditions: [
          {
            label: "Commande pas encore expédiée",
            template: "Bonjour [nom du client],\n\nMerci pour votre message. Votre commande n’a pas encore été expédiée, et je peux donc procéder à son annulation. 🌸\n\nJe vais procéder à l'annulation immédiatement. Vous recevrez une confirmation de l’annulation et du remboursement par Etsy.\n\nSi vous avez d’autres questions ou souhaitez passer une nouvelle commande à l’avenir, je reste à votre disposition. Merci pour votre confiance !"
          },
          {
            label: "Commande déjà expédiée",
            template: "Bonjour [nom du client],\n\nMerci pour votre message. Malheureusement, votre commande a déjà été expédiée, et il n’est plus possible de l’annuler à ce stade. 🚚\n\nToutefois, vous pouvez me retourner l’article dans un délai de 14 jours après réception, conformément à nos conditions de vente. Les frais de retour sont à votre charge, et l’article doit être retourné dans un état neuf et dans son emballage d’origine.\n\nUne fois l’article reçu, je procéderai au remboursement. N’hésitez pas à me contacter pour toute autre question ou assistance. Merci pour votre compréhension et à bientôt !"
          }
        ]
      },
      {
        id: "apres-9",
        number: 9,
        text: "J’ai fait une erreur dans mon adresse, comment la corriger ?",
        conditions: [
          {
            label: "Si la commande n'a pas encore été expédiée",
            template: "Bonjour [nom du client],\n\nMerci de m’avoir signalé cette erreur ! Je ne peux pas modifier l’adresse directement dans l’interface Etsy, mais je peux l’expédier à l’adresse correcte que vous me fournissez. 📬\n\nPour confirmer, voici la nouvelle adresse que vous m’avez communiquée :\n[Nouvelle adresse renseignée]\n\n✅ Merci de valider cette adresse rapidement pour que je puisse procéder à l’expédition. Je ferai tout mon possible pour m’assurer que votre commande arrive au bon endroit."
          },
          {
            label: "Si la commande a déjà été expédiée",
            template: "Bonjour [nom du client],\n\nMerci de m’avoir signalé cette erreur. Malheureusement, votre commande a déjà été expédiée à l’adresse indiquée lors de la commande : 📬\n[Adresse renseignée]\n\nJe n’ai pas la possibilité de modifier l’adresse une fois le colis expédié. Si possible, je vous conseille de contacter votre bureau de poste local pour voir s’ils peuvent rediriger le colis.\n\n📦 Si le colis est retourné à l’expéditeur, je vous contacterai pour organiser un nouvel envoi. Les frais de réexpédition seront à votre charge dans ce cas. Je suis désolée pour ce désagrément et reste disponible si vous avez d’autres questions."
          }
        ]
      },
      {
        id: "apres-10",
        number: 10,
        text: "J’ai commandé le mauvais article, comment puis-je corriger cela ?",
        conditions: [
          {
            label: "Si la commande n'a pas encore été expédiée",
            template: "Bonjour [nom du client],\n\nPas de panique ! Merci de m’envoyer rapidement votre numéro de commande ainsi que l’article que vous souhaitez modifier. ✨\n\nVoici comment cela peut être géré en fonction du prix de l’article :\n\n- Si le nouvel article a le même prix : Je procède directement à l’échange pour l’article souhaité.\n- Si le nouvel article est moins cher : Je remplacerai l’article et vous rembourserai la différence.\n- Si le nouvel article est plus cher :\n  * Option 1 : un seul article dans la commande : Je peux annuler la commande pour que vous puissiez commander directement le bon article.\n  * Option 2 : plusieurs articles dans la commande : Je vous rembourse l’article incorrect. Je vous demanderai ensuite de passer une nouvelle commande pour l’article souhaité. Dans ce cas, les frais d’expédition de votre nouvelle commande vous seront remboursés, et tous les articles seront expédiés ensemble dans un seul envoi.\n\nMerci de me confirmer rapidement votre choix pour éviter tout retard dans l’expédition de votre commande. Je reste disponible pour toute question !"
          },
          {
            label: "Si la commande a déjà été expédiée",
            template: "Bonjour [nom du client],\n\nJe suis désolée d’apprendre que l’article commandé n’était pas celui souhaité. 📦\n\nMalheureusement, la commande a déjà été expédiée et je ne peux pas la modifier à ce stade.\n\nUne fois que vous recevez l’article, vous pouvez me le retourner dans un délai de 14 jours suivant la réception pour un échange ou un remboursement (hors frais de retour). Les retours ne sont pas possibles pour les articles personnalisés, comme précisé dans nos conditions de vente.\n\nJe reste à votre disposition pour vous accompagner dans cette démarche et m’assurer que nous trouvions une solution satisfaisante. Merci pour votre compréhension !"
          }
        ]
      },
      {
        id: "apres-11",
        number: 11,
        text: "Mon colis était vide à la réception, que faire ?",
        template: "Bonjour [nom du client],\n\nJe suis désolée d’apprendre que votre colis était vide à la réception. C’est une situation très rare, et je la prends très au sérieux. Je vais enquêter immédiatement. 🔍\n\nVoici quelques informations concernant l’expédition de votre commande :\nVotre commande a été expédie le [date] avec le numéro de suivi [code]. Le poids indiqué lors de l’expédition était de [poids], ce qui confirme que le colis n’était pas vide au moment de l’envoi.\n\nPour m’aider à résoudre ce problème rapidement, pourriez-vous m’envoyer :\n1️⃣ Des photos claires montrant l’emballage du colis (extérieur et intérieur).\n2️⃣ Une description détaillée de la situation :\n- Comment le colis vous a été livré (à votre boîte aux lettres, remis en main propre, etc.).\n- L’état du colis à son arrivée (endommagement, ouverture suspecte, etc.).\n\nDès que j’aurai ces informations, je pourrai avancer dans mes démarches avec le transporteur. Je suis sincèrement désolée pour ce désagrément. Pas d’inquiétude ! Une fois ces éléments reçus, je procéderai à un [remboursement complet ou réexpédition] de votre commande si la situation est confirmée."
      },
      {
        id: "apres-12",
        number: 12,
        text: "Si ma commande n’arrive pas dans X jours, je laisserai un avis négatif.",
        template: "Bonjour [nom du client],\n\nMerci pour votre message. Je comprends votre frustration concernant le délai de livraison, et je suis là pour vous accompagner. 🤝\n\nAprès vérification du suivi, je peux confirmer que votre colis est actuellement prévu pour arriver dans [X jours]. Cependant, une fois expédié, la livraison dépend de plusieurs facteurs externes, [comme l’efficacité des services postaux, la douane ou d’autres imprévus], qui peuvent parfois entraîner des retards.\n\nJe vous invite à patienter jusqu’à [date prévue]. Je suis confiante que votre colis arrivera bientôt. Si, malgré tout, vous souhaitez un remboursement, voici comment procéder :\n\n1️⃣ Une fois le colis livré, retournez-le dans son emballage d’origine.\n2️⃣ Dès réception du retour, je procéderai à un remboursement rapide, hors frais de livraison.\n\nJe suis sincèrement désolée pour ce désagrément et reste à votre disposition pour trouver une solution qui vous conviendra. 😊"
      },
      {
        id: "apres-13",
        number: 13,
        text: "Comment suivre ma commande ?",
        template: "Bonjour [nom du client],\n\nMerci encore pour votre commande ! Votre colis est en route. Voici votre numéro de suivi : [numéro de suivi]. 📦\n\nVous pouvez suivre votre commande en entrant ce code sur le site suivant : [lien vers le site de suivi].\n\nVeuillez noter qu’il peut falloir quelques jours avant que les informations de suivi ne soient mises à jour par le transporteur.\n\nSi vous avez d’autres questions, n’hésitez pas à me contacter. Je suis là pour vous aider ! 😊"
      },
      {
        id: "apres-14",
        number: 14,
        text: "Je ne peux pas laisser d’avis en tant qu’invité, comment faire ?",
        template: "Bonjour [nom du client],\n\nMerci encore pour votre commande et pour votre soutien ! Je suis ravie que vous ayez choisi ma boutique. 🌟\n\nCela me ferait très plaisir que vous laissiez un avis pour votre commande. Si vous avez des questions ou des préoccupations, n’hésitez pas à me le faire savoir, je suis là pour vous aider !\n\nVoici comment laisser un avis en tant qu’invité :\n1️⃣ Recherchez l’email de confirmation de commande envoyé par Etsy depuis l’adresse transaction@etsy.com.\n2️⃣ Cliquez sur le lien du numéro de commande, situé sous l’en-tête \"Détails de la commande\".\n3️⃣ Suivez les étapes pour créer un compte Etsy.\n4️⃣ Une fois votre compte créé, votre commande sera automatiquement liée à ce compte.\n5️⃣ Accédez à \"Votre compte\" > \"Achats et avis\", puis laissez un avis pour votre commande.\n\nSi vous rencontrez des difficultés, n’hésitez pas à me contacter, je serai ravie de vous aider. Merci encore pour votre soutien ! 😊"
      },
      {
        id: "apres-15",
        number: 15,
        text: "Pouvez-vous me fournir une facture détaillée ?",
        template: "Bonjour [nom du client],\n\nMerci pour votre message. Je peux tout à fait vous fournir une facture détaillée pour votre commande. 🧾\n\nPouvez-vous me transmettre votre numéro de commande ainsi que les informations nécessaires (nom, adresse, etc.) pour établir la facture ? Je vous l’enverrai dans les plus brefs délais.\n\nMerci encore pour votre achat, et je reste à votre disposition pour toute autre question. 😊"
      },
      {
        id: "apres-16",
        number: 16,
        text: "Comment dois-je entretenir cet article pour le conserver en bon état ?",
        template: "Bonjour [nom du client],\n\nMerci pour votre message et pour votre achat. Voici quelques conseils pour entretenir votre [nom du produit] : ✨\n\n[Ajoutez des instructions spécifiques, ex. : \"Nettoyez avec un chiffon doux\", \"Évitez l’exposition directe au soleil ou à l’eau\", etc.].\n\nUn bon entretien permettra à votre article de conserver toute sa beauté et sa qualité dans le temps.\n\nSi vous avez d’autres questions, je reste à votre disposition. Merci encore pour votre confiance ! 😊"
      }
    ]
  },
  {
    id: "relationnel",
    number: 4,
    title: "Relationnel",
    emoji: "4⃣",
    iconName: "HeartHandshake",
    description: "Comment réagir aux avis (positifs et négatifs), trouver des arrangements et gérer les demandes de partenariats",
    questions: [
      {
        id: "relationnel-1",
        number: 1,
        text: "Remerciement pour un avis positif",
        template: "Bonjour [nom du client],\n\nMerci infiniment d’avoir pris le temps de laisser un si bel avis ! Vos mots me touchent beaucoup, et je suis ravie d’apprendre que vous êtes satisfait(e) de votre produit. ✨\n\nVotre soutien est précieux, et je vous remercie encore d’avoir choisi ma boutique [nom de la boutique]. J’espère avoir l’occasion de vous revoir bientôt ! 😊"
      },
      {
        id: "relationnel-2",
        number: 2,
        text: "Comprendre pourquoi le client a donné un avis négatif",
        template: "Bonjour [nom du client],\n\nMerci d’avoir pris le temps de partager votre retour. Je suis sincèrement désolée d’apprendre que votre expérience n’a pas été à la hauteur de vos attentes. 💔\n\nMon objectif est de garantir la satisfaction de chaque client(e), et je souhaite comprendre ce qui n’a pas fonctionné.\n\nPouvez-vous me donner plus de détails sur le problème rencontré ? Cela m’aidera à trouver une solution et à améliorer mes services."
      },
      {
        id: "relationnel-3",
        number: 3,
        text: "Écrire au client pour trouver une solution",
        template: "Bonjour [nom du client],\n\nMerci d’avoir pris le temps de partager votre retour et de m’expliquer ce qui n’a pas répondu à vos attentes. Je suis sincèrement désolée pour [résumé du problème mentionné, par exemple : \"le délai d’expédition plus long que prévu\" ou \"le produit qui n’a pas correspondu à vos attentes\"]. 🌱\n\nJe prends vos remarques très au sérieux et vais faire tout mon possible pour éviter que ce type de situation ne se reproduise. [Proposez une solution, si possible, par exemple : \"Je vais vérifier immédiatement avec le transporteur\" ou \"Je peux vous proposer un remplacement/ajustement si cela vous convient\"].\n\nSi vous souhaitez discuter davantage de ce problème, n’hésitez pas à me contacter directement. Je tiens vraiment à m’assurer de votre satisfaction et reste à votre disposition.\n\nMerci encore pour votre retour, qui m’aide à m’améliorer, et pour votre compréhension. 😊"
      },
      {
        id: "relationnel-4",
        number: 4,
        text: "Remerciement client : \"Merci pour votre travail, c’est magnifique !\"",
        template: "Bonjour [nom du client],\n\nMerci beaucoup pour vos mots si gentils ! 💖 Je suis ravie que mon travail vous plaise. C'est grâce à des retours comme le vôtre que je trouve encore plus de motivation et de plaisir à créer.\n\nSi vous avez d’autres besoins ou envies à l’avenir, n’hésitez pas à me recontacter. Merci encore pour votre soutien ! 😊"
      },
      {
        id: "relationnel-5",
        number: 5,
        text: "Proposition de partenariat : Souhaitez-vous collaborer pour [projet spécifique] ?",
        template: "Bonjour [nom du client],\n\nMerci pour votre proposition de collaboration sur [projet spécifique]. Cela semble très intéressant, et j’aimerais en savoir plus ! 🤝\n\nPouvez-vous m’expliquer vos attentes et la manière dont vous envisagez cette collaboration ? Cela m’aidera à mieux comprendre vos besoins et à voir si cela peut correspondre à ma façon de travailler.\n\nJe reste à votre disposition et serais ravie d’échanger davantage sur ce sujet. Merci pour votre message !"
      }
    ]
  },
  {
    id: "autres",
    number: 5,
    title: "Autres situations",
    emoji: "5⃣",
    iconName: "Sparkles",
    description: "Retards de fabrication, erreurs d'adresse de livraison, avis 3/4 étoiles ou réponse publique à un avis négatif",
    questions: [
      {
        id: "autres-1",
        number: 1,
        text: "Vérification de l’adresse d’expédition avant envoi",
        template: "Bonjour [nom du client],\n\nMerci encore pour votre commande ! Votre commande est prévue pour être expédiée sous [XXX]. Cependant, l’adresse que vous avez fournie semble [incomplète, incorrecte, etc.]. 📬\n\n➡ Voici l’adresse que j’ai actuellement :\n[Adresse fournie par le client]\n\nPouvez-vous me confirmer ou compléter cette adresse avant l’expédition ? Cela permettra d’assurer une livraison sans problème.\n\nMerci pour votre réactivité et je reste à votre disposition pour toute question supplémentaire !"
      },
      {
        id: "autres-2",
        number: 2,
        text: "Prévenir d’un retard dans la fabrication et l’expédition",
        template: "Bonjour [nom du client],\n\nMerci encore pour votre commande et pour votre confiance. Je tiens à vous informer que j’ai pris un peu de retard dans la fabrication de votre article. ⏳\n\nLa date d’expédition initialement prévue était le [ancienne date], mais elle sera finalement le [nouvelle date]. Je m’excuse sincèrement pour ce délai supplémentaire, qui est dû à [raison, ex. un volume élevé de commandes, un souci d’approvisionnement].\n\nJe tiens à vous assurer que je fais tout mon possible pour expédier votre commande au plus vite tout en maintenant la qualité que vous méritez.\n\nMerci pour votre compréhension et votre patience. Si vous avez des questions ou des besoins particuliers, je reste à votre disposition. 😊"
      },
      {
        id: "autres-3",
        number: 3,
        text: "Écrire à un client qui a laissé un avis de 3/4 étoiles",
        template: "Bonjour [nom du client],\n\nMerci beaucoup pour votre retour et pour avoir pris le temps de partager votre expérience. Je suis heureuse d’apprendre que vous avez apprécié [mentionnez un point positif soulevé dans l’avis, par exemple : \"la qualité de mon produit\" ou \"la rapidité de l’envoi\"]. ⭐\n\nToutefois, je remarque que vous avez attribué une note de [3 ou 4 étoiles], et je me demande si tout s’est bien passé avec votre commande. Vos retours sont précieux, et si un point vous a déçu(e), je serais ravie de le comprendre et de le résoudre.\n\nSi vous êtes satisfait(e) de votre achat, je me permets de préciser que les avis 5 étoiles sont d'une grande aide pour les petites boutiques comme la mienne à se développer et à gagner la confiance de nouveaux clients. Bien sûr, votre satisfaction reste ma priorité absolue, et je suis à votre disposition si vous souhaitez discuter davantage de votre expérience.\n\nMerci encore pour votre confiance et pour avoir choisi ma boutique. J’espère avoir l’occasion de vous revoir prochainement ! 😊"
      },
      {
        id: "autres-4",
        number: 4,
        text: "Réponse publique à un avis négatif",
        template: "Merci d’avoir pris le temps de laisser un avis. Je suis désolée d’apprendre que votre expérience n’a pas été à la hauteur de vos attentes. Cela reste une situation exceptionnelle, car je mets tout en œuvre pour garantir la qualité de mes produits et la satisfaction de mes client(e)s. 💔\n\nDès que vous m’avez signalé le problème [résumé du problème], j’ai proposé [précisez la solution, ex. un remplacement, un remboursement]. [Ajoutez une action spécifique, ex. : \"Votre nouvel article a été expédié le [date]\" ou \"Le remboursement a été effectué le [date]\"].\n\nJe tiens à rassurer les futurs acheteurs : chaque commande est préparée avec soin, et je suis toujours disponible pour résoudre rapidement tout souci qui pourrait survenir. Votre satisfaction est ma priorité absolue.\n\nMerci pour ce retour, qui m’aide à continuer à améliorer mes services."
      },
      {
        id: "autres-5",
        number: 5,
        text: "Commande en gros : Faites-vous des tarifs pour des commandes en quantité importante ?",
        template: "Bonjour [nom du client],\n\nMerci pour votre intérêt dans mes créations ! Oui, les commandes en gros sont possibles dans ma boutique. 📦\n\nLe minimum d’achat pour une commande en gros est de [XX] unités ou [XX €]. Je propose également des tarifs dégressifs en fonction des quantités commandées.\n\nPouvez-vous m’indiquer les produits et la quantité souhaités ? Je serai ravie de vous envoyer un devis personnalisé et de discuter des délais associés. Merci encore pour votre message, et à bientôt ! 😊"
      }
    ]
  }
];
