import React from "react";
import "./Layout.css";

class Footer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {date: new Date()};
    }
  
    componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        1000
      );
    }
  
    componentWillUnmount() {
      clearInterval(this.timerID);
    }
  
    tick() {
      this.setState({
        date: new Date()
      });
    }
  
    render() {
      return (
        <div className="footer">
          <span className="footer-text">Hệ thống thu thập dữ liệu khách sạn và hỗ trợ đặt phòng khách sạn</span>
          <a
              href="https://www.facebook.com/nguyenvanhieu.supreme/"
              target="_blank"
              rel="noopener noreferrer"
          >
            Nguyen Van Hieu <br/>
          </a> Đại học Bách Khoa Hà Nội
          <a className="footer-time">{this.state.date.toLocaleTimeString()}</a>
        </div>
      );
    }
  }
  
export default Footer;
