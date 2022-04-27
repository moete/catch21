<template>
  <v-container
    fluid
    class="d-flex pa-1 ma-0"
    :class="mobile ? 'flex-row' : 'flex-column'"
    style="width: 100%; height: auto;"
  >
    <div id="score" :style="mobile ? 'width: 75px;' : 'height: 75px;'">
      <h3 class="pr-1">
        <template> {{ sums[0] }} </template>
        <template v-if="this.sums.length > 1">OR {{ sums[1] }}</template>
      </h3>
    </div>
    <div
      class="cardEmplacement"
      :style="showErrorOutline ? 'box-shadow: 0 0 3pt 2pt red' : ''"
      @click="moveCardThere()"
    >
      <div
        style="position: relative"
        :style="
          mobile
            ? 'height: 100%; width: 12vh; margin-left: 10%;'
            : 'width: 90%; height: 20vw; margin-left:5%; margin-top:5%;'
        "
      >
        <div class="textOnBoard">PLAY CARD HERE</div>

        <GameCard
          :v-if="cards.length > 0"
          v-for="(card, index) in cards"
          :key="index"
          :positionZ="index"
          :isFaceUp="true"
          :cardNumber="card.cardNumber"
          :color="card.color"
          :spreadShadow="true"
          :offsetY="mobile ? 0 : 100"
          :offsetX="mobile ? 35 : 0"
        />

        <BonusDisplayer
          :show="displayBonus"
          :bonuses="bonusArray"
        ></BonusDisplayer>
      </div>
    </div>
  </v-container>
</template>

<script>
import GameCard from '@/components/Card.vue';
import BonusDisplayer from '@/components/BonusDisplayer.vue';

import { cardNumbers, scoreName } from '@/utils/types.js';
import Deck from '@/utils/deck';

export default {
  props: {
    cards: Array,
    mobile: Boolean,
  },
  data: function() {
    return {
      showErrorOutline: false,
      displayBonus: false,
      bonusArray: [],
    };
  },
  components: {
    GameCard,
    BonusDisplayer,
  },
  computed: {
    sums() {
      let sumOfCards = 0;
      let sumsOfCards = [];
      let isThereAce = false;
      for (let i = 0; i < this.cards.length; i++) {
        sumOfCards = sumOfCards + this.getCardValue(this.cards[i]);
        if (this.cards[i].cardNumber === 'ACE') {
          isThereAce = true;
        }
      }

      sumsOfCards.push(sumOfCards);
      // Ace count for 1 or 11
      const sumWithAceHighValue = sumOfCards + 10;
      if (isThereAce && sumWithAceHighValue <= 21) {
        sumsOfCards.push(sumWithAceHighValue);
      }
      //return sums;
      return sumsOfCards;
    },
    cardLength() {
      return this.cards.length;
    },
  },
  watch: {
    cards: function() {
      const scoreTrigger = [];
      if (this.sums.includes(21)) {
        scoreTrigger.push(scoreName.CATCH_21);
      }
      if (this.isFiveCardCharlie()) {
        scoreTrigger.push(scoreName.FIVE_CARD_CHARLIE);
      }
      if (this.isBlackJack()) {
        scoreTrigger.push(scoreName.BLACK_JACK_ATTACK);
      }
      if (scoreTrigger.length > 0) {
        this.playAnimation(scoreTrigger);
        this.$emit('score-and-clear-stack', this.$vnode.key, scoreTrigger);
      }
    },
  },
  methods: {
    playAnimation(bonusArrayInput) {
      this.bonusArray = bonusArrayInput;
      this.displayBonus = true;
      setTimeout(() => {
        this.displayBonus = false;
      }, 1500);
    },
    isBlackJack() {
      if (this.cards.length > 0) {
        const lastCardIndex = this.cards.length - 1;
        return Deck.isABlackJack(this.cards[lastCardIndex]);
      }
      return false;
    },

    isFiveCardCharlie() {
      return this.cards.length >= 5;
    },
    moveCardThere() {
      this.$emit('move-card-here', this.$vnode.key);
    },
    getCardValue(card) {
      return cardNumbers[card.cardNumber];
    },
    clearCards() {
      this.$emit('clear-card-here', this.$vnode.key);
    },
    showErrorImpossibleMove() {
      this.showErrorOutline = true;
      setTimeout(() => (this.showErrorOutline = false), 500);
    },
  },
};
</script>

<style scoped>
#score {
  border: 3px solid rgba(255, 255, 255, 0.512);
  box-shadow: 0 0 0 0.1em rgba(255, 255, 255, 0);
  margin-bottom: 10px;
  border-radius: 5px;
}
h3 {
  font-size: max(12px, 2vw);
  color: white;
  text-align: center;
  border: 4px rgb(40, 32, 32);
}

.textOnBoard {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 100%;
  font-size: max(15px, 1vw);
  font-weight: 800;
  padding: 4px;
  color: white;
}

.cardEmplacement {
  height: 100%;
  width: 100%;
  cursor: pointer;
  background-image: linear-gradient(
    to bottom,
    rgb(56, 33, 102) 17.6%,
    rgba(255, 0, 0, 0)
  );

  /* -webkit-mask: linear-gradient(rgb(78, 45, 146) 2.6%, transparent); */
  /* mask: linear-gradient(rgb(38, 27, 245) 100.2%, transparent); */
  padding: 4px;
  border: 3px solid rgba(255, 255, 255, 0.512);
  border-radius: 5px;
  opacity: 2px;
}
</style>
