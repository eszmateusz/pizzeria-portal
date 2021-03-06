import { classNames, select, settings, templates } from '../settings.js';
import utils from '../utils.js';
import AmountWidget from './AmountWidget.js';
import DatePicker from './DatePicker.js';
import HourPicker from './HourPicker.js';

class Booking {
  constructor(bookingWrapper) {
    const thisBooking = this;

    thisBooking.selectedTable = null;

    thisBooking.render(bookingWrapper);
    thisBooking.initWidgets();
    thisBooking.getData();
  }

  getData() {
    const thisBooking = this;

    const startDateParam = settings.db.dateStartParamKey + '=' + utils.dateToStr(thisBooking.datePicker.minDate);
    const endDateParam = settings.db.dateEndParamKey + '=' + utils.dateToStr(thisBooking.datePicker.maxDate);

    const params = {
      booking: [
        startDateParam,
        endDateParam,
      ],
      eventsCurrent: [
        settings.db.notRepeatParam,
        startDateParam,
        endDateParam,
      ],
      eventsRepeat: [
        settings.db.repeatParam,
        endDateParam,
      ],
    };
    
    const urls = {
      booking:       settings.db.url + '/' + settings.db.booking
                                     + '?' + params.booking.join('&'),
      eventsCurrent: settings.db.url + '/' + settings.db.event
                                     + '?' + params.eventsCurrent.join('&'),
      eventsRepeat:  settings.db.url + '/' + settings.db.event
                                     + '?' + params.eventsRepeat.join('&'),
    };

    Promise.all([
      fetch(urls.booking),
      fetch(urls.eventsCurrent),
      fetch(urls.eventsRepeat),
    ])
      .then(function (allResponses) {
        const bookingsResponse = allResponses[0];
        const eventsCurrentResponse = allResponses[1];
        const eventsRepeatResponse = allResponses[2];
        return Promise.all ([
          bookingsResponse.json(),
          eventsCurrentResponse.json(),
          eventsRepeatResponse.json(),
        ]);
      })
      .then(function ([bookings, eventsCurrent, eventsRepeat]) {
        //console.log(bookings);
        //console.log(eventsCurrent);
        //console.log(eventsRepeat);
        thisBooking.parseData(bookings, eventsCurrent, eventsRepeat);
      });
  }

  parseData(bookings, eventsCurrent, eventsRepeat) {
    const thisBooking = this;

    thisBooking.booked = {};

    for (let item of bookings) {
      thisBooking.makeBooked(item.date, item.hour, item.duration, item.table);
    }

    for (let item of eventsCurrent) {
      thisBooking.makeBooked(item.date, item.hour, item.duration, item.table);
    }

    const minDate = thisBooking.datePicker.minDate;
    const maxDate = thisBooking.datePicker.maxDate;

    for (let item of eventsRepeat) {
      if (item.repeat == 'daily') {
        for (let loopDate = minDate; loopDate <= maxDate; loopDate = utils.addDays(loopDate, 1)) { 
          thisBooking.makeBooked(utils.dateToStr(loopDate), item.hour, item.duration, item.table);
        }
      }
    }

    thisBooking.updateDOM();
  }

  makeBooked(date, hour, duration, table) {
    const thisBooking = this;

    if (typeof thisBooking.booked[date] == 'undefined') {
      thisBooking.booked[date] = {};
    }

    const startHour = utils.hourToNumber(hour);

    for (let hourBlock = startHour; hourBlock < startHour + duration; hourBlock += 0.5) {

      if (typeof thisBooking.booked[date][hourBlock] == 'undefined') {
        thisBooking.booked[date][hourBlock] = [];
      }
      thisBooking.booked[date][hourBlock].push(table);
    }
  }

  updateDOM() {
    const thisBooking = this;

    for (let table of thisBooking.dom.tables) {
      if (table.dataset.table == thisBooking.selectedTable) {	      

        const startHour = utils.hourToNumber(thisBooking.hourPicker.value);

        if (startHour + thisBooking.hoursAmount.value > settings.hours.close) {
          alert('Selected duration exceeds the pizzeria opening hours! Please shorten the duration or change the beginning time.');
          table.classList.remove('active');
          return;
        } else {
          for (let hourBlock = startHour; hourBlock < startHour + thisBooking.hoursAmount.value; hourBlock += 0.5) {
            if (typeof thisBooking.booked[thisBooking.datePicker.value][hourBlock] == 'undefined') {
              table.classList.add('active');
            } else if (thisBooking.booked[thisBooking.datePicker.value][hourBlock].includes(parseInt(thisBooking.selectedTable))) {
              alert('Selected table is not available within the chosen duration! Please shorten the duration or choose different table.');
              table.classList.remove('active');
              return;
            } else {
              table.classList.add('active');
            }
          }
        }
      } else {
        table.classList.remove('active');
      }
    }

    thisBooking.date = thisBooking.datePicker.value;
    thisBooking.hour = utils.hourToNumber(thisBooking.hourPicker.value);

    let allAvailable = false;

    if (
      typeof thisBooking.booked[thisBooking.date] == 'undefined'
      ||
      typeof thisBooking.booked[thisBooking.date][thisBooking.hour] == 'undefined'
    ) {
      allAvailable = true;
    }

    for (let table of thisBooking.dom.tables) {
      let tableId = table.getAttribute(settings.booking.tableIdAttribute);
      if (!isNaN(tableId)) {
        tableId = parseInt(tableId);
      }

      if (
        !allAvailable
        &&
        thisBooking.booked[thisBooking.date][thisBooking.hour].includes(tableId) // > -1
      ) {
        table.classList.add(classNames.booking.tableBooked);
      } else {
        table.classList.remove(classNames.booking.tableBooked);
      }

      thisBooking.rangeSliderColour();
    }
  }

  sendBooking() {
    const thisBooking = this;

    if (!thisBooking.selectedTable) {
      alert('Please select the table.');
      return;
    }

    if (!thisBooking.dom.phone.value) {
      alert('Please provide the phone number.');
      return;
    }

    if (!thisBooking.dom.address.value) {
      alert('Please provide the e-mail address.');
      return;
    }

    const url = settings.db.url + '/' + settings.db.booking;

    const booking = {
      date: thisBooking.datePicker.value,
      hour: thisBooking.hourPicker.value,
      table: parseInt(thisBooking.selectedTable),
      duration: thisBooking.hoursAmount.value,
      ppl: thisBooking.peopleAmount.value,
      starters: [],
      phone: thisBooking.dom.phone.value,
      address: thisBooking.dom.address.value,
    };

    for (let starter of thisBooking.dom.starters) {
      if (starter.checked == true) {
        booking.starters.push(starter.value);
      }
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(booking),
    };

    fetch(url, options)
      .then(function (response) {
        return response.json();
      }).then(function (parsedResponse) {
        thisBooking.makeBooked(parsedResponse.date, parsedResponse.hour, parsedResponse.duration, parsedResponse.table);
        thisBooking.selectedTable = null;
        thisBooking.updateDOM();
      });
  }

  rangeSliderColour() {
    const thisBooking = this;

    const bookedHours = thisBooking.booked[thisBooking.date]; //godziny od 12 do 19.30 potem undefined
    const colorArray = [];

    const slider = document.querySelector('.rangeSlider');
    //console.log(slider);

    const openHour = settings.hours.open;
    const closeHour = settings.hours.close;
    const step = 0.5; // 30min

    for (let bookedHour in bookedHours) {
      const firstValue = ((bookedHour - openHour) * 100) / (closeHour - openHour);
      const secondValue = (((bookedHour - openHour) + step) * 100) / (closeHour - openHour);

      if (bookedHours[bookedHour].length === 3) {
        colorArray.push('/*' + bookedHour + '*/red ' + firstValue + '%, red ' + secondValue + '%');
      } else if (bookedHours[bookedHour].length === 2) {
        colorArray.push('/*' + bookedHour + '*/orange ' + firstValue + '%, orange ' + secondValue + '%');
      } else {
        colorArray.push('/*' + bookedHour + '*/green ' + firstValue + '%, green ' + secondValue + '%');
      }
    }

    const gradientColor = colorArray.sort();
    slider.style.background = 'linear-gradient(to right, ' + gradientColor + ')';
  }
  
  render(bookingWrapper) {
    const thisBooking = this;

    const generatedHTML = templates.bookingWidget();

    thisBooking.dom = {};

    thisBooking.dom.wrapper = bookingWrapper;
    thisBooking.dom.wrapper.innerHTML = generatedHTML;
    
    thisBooking.dom.peopleAmount = thisBooking.dom.wrapper.querySelector(select.booking.peopleAmount);
    thisBooking.dom.hoursAmount = thisBooking.dom.wrapper.querySelector(select.booking.hoursAmount);

    thisBooking.dom.starters = thisBooking.dom.wrapper.querySelectorAll(select.booking.starters);

    thisBooking.dom.phone = thisBooking.dom.wrapper.querySelector(select.booking.phone);
    thisBooking.dom.address = thisBooking.dom.wrapper.querySelector(select.booking.address);

    thisBooking.dom.datePicker = thisBooking.dom.wrapper.querySelector(select.widgets.datePicker.wrapper);
    thisBooking.dom.hourPicker = thisBooking.dom.wrapper.querySelector(select.widgets.hourPicker.wrapper);
    
    thisBooking.dom.tables = thisBooking.dom.wrapper.querySelectorAll(select.booking.tables);
    thisBooking.dom.form = thisBooking.dom.wrapper.querySelector(select.booking.form);
  }

  initWidgets() {
    const thisBooking = this;

    thisBooking.peopleAmount = new AmountWidget(thisBooking.dom.peopleAmount);
    thisBooking.hoursAmount = new AmountWidget(thisBooking.dom.hoursAmount);

    thisBooking.datePicker = new DatePicker(thisBooking.dom.datePicker);
    thisBooking.hourPicker = new HourPicker(thisBooking.dom.hourPicker);

    thisBooking.dom.wrapper.addEventListener('updated', function () {
      thisBooking.updateDOM();
    });

    thisBooking.dom.form.addEventListener('submit', function (event) {
      event.preventDefault();
      thisBooking.sendBooking();
    });

    thisBooking.dom.datePicker.addEventListener('updated', function () {
      thisBooking.selectedTable = null;
      thisBooking.updateDOM();
    });

    thisBooking.dom.hourPicker.addEventListener('updated', function () {
      thisBooking.selectedTable = null;
      thisBooking.updateDOM();
    });

    thisBooking.dom.hoursAmount.addEventListener('updated', function () {
      thisBooking.selectedTable = null;
      thisBooking.updateDOM();
    });

    for (let table of thisBooking.dom.tables) {
      table.addEventListener('click', function () {

        if (table.classList.contains('booked')) {
          return;
        }

        thisBooking.selectedTable = table.dataset.table;
        thisBooking.updateDOM();
      });
    }
  }
}
export default Booking;