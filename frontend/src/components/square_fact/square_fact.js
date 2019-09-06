import React from "react";
import "./square_fact.css";

class SquareFact extends React.Component {
  constructor(props) {
    super(props);
    this.squareRef = React.createRef();
    this.numRef = React.createRef();
  }

  componentDidMount() {
    const handleIntersect = ([entry]) => {
      if (entry.isIntersecting) {
        this.animateValue(this.numRef.current, 0, 100, 2000);
        observer.unobserve(entry.target);
      }
    };
    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.5
    });
    observer.observe(this.squareRef.current);
  }

  animateValue = (element, start, end, duration) => {
    // assumes integer values for start and end

    var obj = element;
    var range = end - start;
    // no timer shorter than 50ms (not really visible any way)
    var minTimer = 50;
    // calc step time to show all interediate values
    var stepTime = Math.abs(Math.floor(duration / range));

    // never go below minTimer
    stepTime = Math.max(stepTime, minTimer);

    // get current time and calculate desired end time
    var startTime = new Date().getTime();
    var endTime = startTime + duration;
    var timer;

    function run() {
      var now = new Date().getTime();
      var remaining = Math.max((endTime - now) / duration, 0);
      var value = Math.round(end - remaining * range);
      obj.innerHTML = value;
      if (value == end) {
        clearInterval(timer);
      }
    }

    timer = setInterval(run, stepTime);
    run();
  };
  render() {
    return (
      <div className="square_fact" ref={this.squareRef}>
        <span className="square_fact_number" ref={this.numRef}>
          0
        </span>
        <span className="square_fact_addition">registered</span>
        <span className="square_fact_category">Users</span>
      </div>
    );
  }
}

export default SquareFact;
