<template>
  <v-container class="pa-0">
    <div
      style="
        width: 100%;
        padding-left: 20%;
        padding-right: 20%;
        margin-top: 50px;
      "
      @click="discard()"
    >
      <div
        style="position: relative;"
        :style="
          mobile
            ? 'height:15vh; max-width: 15vh;'
            : 'height:30vh; max-width: 30vh;'
        "
      >
        <div
          v-if="cards.length === 0"
          style="
            position: absolute;
            display: flex;
            font-size: 1em;
            color: rgb(255, 255, 255, 0.3);
            border-radius: 16px;
            height: 100%;
            padding: 16px;
            align-items: center;
            padding : 12px;
            border: 4px solid rgba(255, 255, 255, 0.512);

         "
          class="text-center"
        >
          CLICK HERE TO DISCARD
        </div>

        <GameCard
          v-for="(card, index) in cards"
          :key="index"
          :positionZ="index"
          :isFaceUp="false"
          :cardNumber="card.cardNumber"
          :color="card.color"
          :offsetY="-1"
        />
      </div>
    </div>
    <SoftIndicator
      label="Discards"
      :value="remainingCards"
      class="mt-1 text-center"
    />
  </v-container>
</template>

<script>
import GameCard from '@/components/Card.vue';
import SoftIndicator from '@/components/SoftIndicator.vue';

export default {
  props: {
    cards: Array,
    mobile: Boolean,
  },
  computed: {
    remainingCards() {
      return this.cards.length;
    },
  },
  methods: {
    discard() {
      this.$emit('discard-a-card');
    },
  },
  components: {
    GameCard,
    SoftIndicator,
  },
};
</script>
