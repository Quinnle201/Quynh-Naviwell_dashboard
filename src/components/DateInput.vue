<script>
import { set } from 'lodash';
import { Field } from 'vee-validate';

export default {
  name: `FormDate`,
  components: {
    Field
  },
  props: {
    value: {
      type: [Number, String],
      required: false,
    },
    showDay: {
      type: Boolean,
      default: true,
    },
    showMonth: {
      type: Boolean,
      default: true,
    },
    showYear: {
      type: Boolean,
      default: true,
    },
    fieldName: {
      type: String,
      required: true,
    },
    checkDate: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      day: `${this.value ? new Date(this.value).getDate() : ``}`,
      month: `${this.value ? new Date(this.value).getMonth() + 1 : ``}`,
      year: `${this.value ? new Date(this.value).getFullYear() : ``}`,
      isError: false,
      finalDate: null,
    };
  },
  watch: {
    finalDate(current, prev) {
      if(prev == null) {
        this.day = `${current ? new Date(current).getDate() : ``}`
        this.month = `${current ? new Date(current).getMonth() + 1 : ``}`
        this.year = `${current ? new Date(current).getFullYear() : ``}`
      }
    },
    day(current, prev) {
      let value = current
      if (value.length > 2) { value = prev }
      const matched = value.match(/\d+/g)
      if(!matched) {
        this.day = ''
        return
      }
      value = matched.join([])
      this.day = value
    },
    month(current, prev) {
      let value = current
      if (value.length > 2) { value = prev }
      const matched = value.match(/\d+/g)
      if(!matched) {
        this.month = ''
        return
      }
      value = matched.join([])
      this.month = value
    },
    year(current, prev) {
      let value = current
      if (value.length > 4) { value = prev }
      const matched = value.match(/\d+/g)
      if(!matched) {
        this.year = ''
        return
      }
      value = matched.join([])
      this.year = value
    },
  },
  methods: {
    isValidDate(s) {
      // Assumes s is "yyyy/mm/dd"
      if (!/^\d\d\d\d\/\d\d\/\d\d$/.test(s)) {
        return false;
      }
      const parts = s.split('/').map((p) => parseInt(p, 10));
      parts[0] -= 1;
      parts[1] -= 1;
      const d = new Date(parts[0], parts[1], parts[2]);
      return d.getMonth() === parts[1] && d.getDate() === parts[2] && d.getFullYear() === parts[0];
    },
    updateDay() {
      let day = this.day ? this.day : '0'
      if (day == "00" || day.length < 2) return;
      day = day.padStart(2, 0);
      if (this.showYear) this.$refs.year.select();
      // else if (this.showYear) this.$refs.year.select();
    },
    updateMonth() {
      let month = this.month ? this.month : '0'
      if (month == "00" || month.length < 2) return;
      month = month.padStart(2, 0);
      if (this.showDay) this.$refs.day.select();
      // else if (this.showYear) this.$refs.year.select();
    },
    updateValue() {
      this.isError = false
      if (!this.month || !this.day || !this.year) {
        return
      }

      let month = this.month;
      let day = this.day;
      let year = this.year;

      if(day < 10 && day.length == 1) {
        day = "0"+day
      }
      if(month < 10 && month.length == 1){
        month = "0"+month
      }

      // const input = `${month}/${day}/${year}`
      const input = `${year}/${month}/${day}`
      if (!this.isValidDate(input)) {
        // borderline with red to indicate error
        this.isError = true
        this.finalDate = null
        return;
      }
      if(this.checkDate) {
        //Check if date is within acceptable range, ie. no more than 110 year ago and no less than 13 years from now.
        const now = new Date()
        const date = new Date(input)
        const minYear = new Date(now.getFullYear() - 110, 0, 1).getTime(); // 110 years from now
        const maxYear = new Date(now.getFullYear() - 13, 0, 1).getTime() // 13 years from now

        if (date >= minYear && date <= maxYear) {
          this.isError = false
          console.log("date check passed", input)
          this.finalDate = input
          return;
        }
      } else {
          this.isError = false
          this.finalDate = input
          return;
      }
      this.finalDate = null
      this.isError = true

    },
  },
};
</script>

<template>
  <div class="FormDate" :class="isError ? 'FormDate-error' : ''" @keyup.capture="updateValue">

    <input v-if="showMonth" ref="month" v-model="month" class="FormDate__input FormDate__input--month" type="text"
      placeholder="Month" @input="updateMonth" />

      <span v-if="showDay && showMonth" class="FormDate__divider">/</span>

    <input v-if="showDay" ref="day" v-model="day" class="FormDate__input FormDate__input--day" type="text"
      placeholder="Day" @input="updateDay" />

    <span v-if="showYear && (showDay || showMonth)" class="FormDate__divider">/</span>

    <input v-if="showYear" ref="year" v-model="year" class="FormDate__input FormDate__input--year" type="text"
      placeholder="Year" />

    <Field :name="fieldName" type="hidden" v-model="finalDate"/>  

  </div>
</template>
  
<style>
.FormDate-error {
  border: 1px solid red !important;
}

.FormDate {
  display: inline-flex;
  position: relative;
  overflow: hidden;
  color: #CCCCCC;
  border: 1px solid #CCCCCC;
  border-radius: 16px;
}

.FormDate__input {
  padding: 0.75em;
  padding-right: .375em;
  padding-left: .375em;
  border: none;
  text-align: center;
  -moz-appearance: textfield;
}

.FormDate__input::-webkit-inner-spin-button {
  display: none;
}

.FormDate__input:first-child {
  padding-left: 0.75em;
}

.FormDate__input:last-child {
  padding-right: 0.75em;
}

.FormDate__input:focus {
  outline: none;
}

.FormDate__input--year,
.FormDate__input--month,
.FormDate__input--day {
  width: 72px;
}

.FormDate__divider {
  background-color: #FFFFFF;
  padding-top: 0.75em;
  padding-bottom: 0.75em;
  pointer-events: none;
}
</style>