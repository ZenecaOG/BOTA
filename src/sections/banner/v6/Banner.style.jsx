import styled from "styled-components";

import BannerBgImg from "../../../assets/images/banner/custom/banner-background-new.jpg";

const BannerWrapper = styled.section`
  background-image: url(${BannerBgImg});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  min-height: 100vh;
  padding: 223px 0 60px 0;
  position: relative;
  z-index: 0;
  overflow: hidden;

  /* Overlay to ensure text readability */
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(7, 25, 40, 0.4); /* Darker blue overlay */
    z-index: -1;
  }

  .banner-title {
    margin-bottom: 10px;
    font-family: ${({ theme }) => theme.fonts.title2};
    font-size: 100px;
    font-weight: 400;
    line-height: 110px;
    color: #FFFFFF;
  }

  .banner-subtitle {
    margin-bottom: 32px;
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: 18px;
    font-weight: 500;
    line-height: 30px;
    color: ${({ theme }) => theme.colors.white};
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  }

  .presale-card {
    margin: 0 auto 140px; /* Restored original bottom margin */
    width: 625px;
    max-width: 100%;
    position: relative;

    /* Original presale-card styles */
    border-radius: 20px;
    border: 2px solid rgba(29, 255, 224, 0.2); /* Teal border */
    background: rgba(7, 35, 50, 0.9); /* Darker blue background */
    backdrop-filter: blur(20px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);

    &-header {
      padding: 20px 40px;
      background: rgba(30, 122, 106, 0.3); /* Subtle teal header */
    }

    &-counter {
      padding: 20px;
      background: rgba(29, 255, 224, 0.1); /* Teal background */
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &-body {
      padding: 40px;
    }
  }

  @media screen and (max-width: 767px) {
    .banner-title {
      margin-bottom: 10px;
      font-size: 100px;
      line-height: 110px;
      color: #FFFFFF;
    }
  }

  @media screen and (max-width: 575px) {
    .banner-title {
      font-size: 100px;
      line-height: 110px;
      color: #FFFFFF;
    }
  }

  @media screen and (max-width: 480px) {
    padding: 150px 0 60px 0;

    .banner-title {
      font-size: 100px;
      line-height: 110px;
      color: #FFFFFF;
    }

    .presale-card {
      border-radius: 20px;

      h5 {
        font-size: 14px;
        line-height: 24px;
      }

      &-header {
        padding: 10px 20px;
      }

      &-counter {
        padding: 10px;
      }

      &-body {
        padding: 20px;
      }
    }
  }
`;

export default BannerWrapper;
