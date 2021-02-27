const priceShieldReasons = {
  0.5: {
    "en-US":
      "Price under 5 euros - Price can't be more than 50% cheaper than the MKM trend.",
    "fr-FR":
      "Prix en dessous de 5 euros - Le prix de vente ne peut être inférieur de plus de 50% à la tendance MKM.",
  },
  0: {
    "en-US":
      "Price between 5 and 10 euros - Price can't be more than 30% cheaper than the MKM trend.",
    "fr-FR":
      "Prix entre 5 et 10 euros - Le prix de vente ne peut être inférieur de plus de 30% à la tendance MKM.",
  },
  1: {
    "en-US":
      "Price between 10 and 20 euros - Price can't be more than 20% cheaper than the MKM trend.",
    "fr-FR":
      "Prix entre 10 et 20 euros - Le prix de vente ne peut être inférieur de plus de 20% à la tendance MKM.",
  },
  2: {
    "en-US":
      "Price between 20 and 50 euros - Price can't be more than 10% cheaper than the MKM trend.",
    "fr-FR":
      "Prix entre 20 et 50 euros - Le prix de vente ne peut être inférieur de plus de 10% à la tendance MKM.",
  },
  3: {
    "en-US":
      "Price above 50 euros - Price can't be more than 5% cheaper than the MKM trend.",
    "fr-FR":
      "Prix au dessus de 50 euros - Le prix de vente ne peut être inférieur de plus de 5% à la tendance MKM.",
  },
  3.5: {
    "en-US":
      "Price under 10 euros - Variation Rate between old price and new price can't be higher than 60%.",
    "fr-FR":
      "Prix en dessous de 10 euros -  Le taux de variation entre l'ancien et le nouveau prix ne peut être supérieur à 60%.",
  },
  4: {
    "en-US":
      "Price between 10 and 20 euros - Variation Rate between old price and new price can't be higher than 40%.",
    "fr-FR":
      "Prix entre 10 et 20 euros - Le taux de variation entre l'ancien et le nouveau prix ne peut être supérieur à 40%.",
  },
  5: {
    "en-US":
      "Price above 20 euros - Variation Rate between old price and new price can't be higher than 30%.",
    "fr-FR":
      "Prix au dessus de 20 euros - Le taux de variation entre l'ancien et le nouveau prix ne peut être supérieur à 30%.",
  },
  6: {
    "en-US":
      "Price under 20 euros - Price can't be more than 80% cheaper than the MKM trend on used cards.",
    "fr-FR":
      "Prix en dessous de 20 euros - Le prix de vente ne peut être inférieur de plus de 80% à la tendance MKM sur les cartes usées.",
  },
  7: {
    "en-US":
      "Price under 50 euros - Price can't be more than 60% cheaper than the MKM trend on used cards.",
    "fr-FR":
      "Prix en dessous de 50 euros - Le prix de vente ne peut être inférieur de plus de 60% à la tendance MKM sur les cartes usées.",
  },
  8: {
    "en-US":
      "Price above 50 euros - Price can't be more than 40% cheaper than the MKM trend on used cards.",
    "fr-FR":
      "Prix en dessous de 40 euros - Le prix de vente ne peut être inférieur de plus de 40% à la tendance MKM sur les cartes usées.",
  },
  9: {
    "en-US":
      "Variation Rate between old price and new price can't be higher than 60%.",
    "fr-FR":
      "Le taux de variation entre l'ancien et le nouveau prix ne peut être supérieur à 60%.",
  },
};

module.exports = {
  priceShieldReasons,
};
