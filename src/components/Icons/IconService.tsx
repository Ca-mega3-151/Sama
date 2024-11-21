import classNames from 'classnames';
import { FC, HTMLAttributes } from 'react';

export const IconService: FC<HTMLAttributes<HTMLSpanElement>> = props => {
  return (
    <span {...props} className={classNames('flex items-center justify-center', props.className)}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_7814_27376)">
          <path
            d="M10.4167 4.05648C10.4167 3.96072 10.4548 3.86889 10.5225 3.80118C10.5902 3.73347 10.682 3.69543 10.7778 3.69543H13.222C13.3177 3.69543 13.4095 3.73347 13.4772 3.80118C13.545 3.86889 13.583 3.96072 13.583 4.05648C13.583 4.15223 13.545 4.24406 13.4772 4.31177C13.4095 4.37948 13.3177 4.41752 13.222 4.41752H10.7778C10.682 4.41752 10.5902 4.37948 10.5225 4.31177C10.4548 4.24406 10.4167 4.15223 10.4167 4.05648Z"
            fill="#777E91"
            stroke="#777E91"
            strokeWidth="0.5"
          />
          <mask id="path-2-inside-1_7814_27376" fill="white">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18.3516 8.31574C18.1054 8.50731 17.786 8.66057 17.4008 8.78492C17.4745 9.53168 17.3897 10.2855 17.1519 10.9978C16.9141 11.7101 16.5285 12.3653 16.0199 12.921C15.5113 13.4768 14.891 13.921 14.1989 14.2249C13.5067 14.5289 12.7581 14.6859 12.0011 14.6859C11.244 14.6859 10.4954 14.5289 9.80326 14.2249C9.11112 13.921 8.49083 13.4768 7.98225 12.921C7.47367 12.3653 7.08808 11.7101 6.85025 10.9978C6.61242 10.2855 6.52763 9.53168 6.60133 8.78492C6.21612 8.66057 5.89669 8.50731 5.65119 8.31574C5.33244 8.06703 5.11881 7.73498 5.09372 7.3357C5.06998 6.96533 5.21783 6.65075 5.36567 6.42893C5.51162 6.21882 5.68493 6.02874 5.8811 5.86362C5.97604 5.78094 6.06963 5.70768 6.15644 5.64382C6.13067 5.50602 6.10219 5.33932 6.0737 5.1464C5.95356 4.2991 5.89463 3.44438 5.89737 2.58875C5.89737 2.37769 5.98825 2.2204 6.0303 2.15385C6.0832 2.06983 6.14559 1.9979 6.20256 1.9401C6.31581 1.82246 6.4623 1.70282 6.62303 1.58787C6.94856 1.35395 7.39617 1.09113 7.92787 0.845112C8.98787 0.354419 10.4439 -0.0999756 12.0011 -0.0999756C13.5589 -0.0999756 15.0143 0.355092 16.0743 0.845112C16.5314 1.05233 16.9682 1.30098 17.3791 1.58787C17.5398 1.70282 17.6863 1.82314 17.7996 1.9401C17.8565 1.9979 17.9189 2.06983 17.9718 2.15385C18.0139 2.2204 18.1048 2.37769 18.1048 2.58875C18.1048 3.66559 18.0166 4.53808 17.9284 5.1464C17.8999 5.33932 17.8715 5.50602 17.8457 5.64382C17.9325 5.70768 18.0268 5.78094 18.1217 5.86362C18.2913 6.01083 18.4852 6.2024 18.6365 6.42893C18.785 6.65075 18.9321 6.96533 18.9091 7.33637C18.884 7.73498 18.6704 8.06703 18.3516 8.31574ZM7.25511 2.80251C7.26528 3.70861 7.34123 4.44128 7.41651 4.95349C7.43415 5.07448 7.45178 5.18203 7.46806 5.27748H16.5341C16.551 5.18203 16.568 5.07381 16.5856 4.95349C16.6602 4.44128 16.7369 3.70861 16.747 2.80251C16.6942 2.75827 16.6397 2.71612 16.5836 2.67614C16.3388 2.5007 15.9671 2.27955 15.5005 2.06378C14.5626 1.62955 13.3059 1.24439 12.0011 1.24439C10.6962 1.24439 9.43955 1.62955 8.50162 2.06378C8.03502 2.27955 7.66337 2.5007 7.41923 2.67546C7.36284 2.71587 7.30809 2.7578 7.25511 2.80251ZM7.10997 6.62184L7.10794 6.62319C6.99089 6.70049 6.87877 6.7849 6.77224 6.87593C6.65152 6.98079 6.55521 7.08296 6.49689 7.17169C6.48301 7.19164 6.47055 7.21253 6.45959 7.2342C6.46919 7.24289 6.47915 7.25118 6.48943 7.25907C6.59116 7.33839 6.80954 7.45468 7.23544 7.56962C7.31953 7.59247 7.40973 7.61398 7.50603 7.63549L7.51214 7.63684C7.85259 7.71145 8.27171 7.778 8.78238 7.83043C9.50601 7.90504 10.4168 7.95411 11.5548 7.96486L12.0011 7.96621C14.1896 7.96621 15.605 7.8311 16.4907 7.63684L16.4961 7.63549C16.5931 7.61398 16.6833 7.59247 16.7674 7.56962C17.1926 7.45535 17.4116 7.33839 17.5127 7.25907C17.523 7.25118 17.5329 7.24289 17.5425 7.2342C17.5318 7.21255 17.5196 7.19167 17.5059 7.17169C17.427 7.06182 17.3343 6.96242 17.2299 6.87593C17.1236 6.78491 17.0117 6.7005 16.8949 6.62319L16.8922 6.62184H7.10997ZM11.8166 9.31057C13.6084 9.31057 14.9973 9.21646 16.0621 9.05245C16.0971 9.60049 16.0188 10.1498 15.832 10.6668C15.6452 11.1838 15.3539 11.6576 14.9759 12.059C14.5978 12.4605 14.1411 12.7812 13.6336 13.0015C13.1261 13.2218 12.5785 13.3371 12.0245 13.3403C11.4705 13.3434 10.9216 13.2344 10.4116 13.0199C9.90155 12.8054 9.44109 12.4899 9.05842 12.0928C8.67576 11.6957 8.37894 11.2253 8.18617 10.7105C7.9934 10.1957 7.90873 9.64724 7.93736 9.09883C8.92955 9.23461 10.2012 9.31057 11.8166 9.31057ZM6.62846 21.9993C6.59312 22.2494 6.57544 22.5017 6.57556 22.7542V23.4264C6.57564 23.5742 6.52658 23.7178 6.43599 23.8352C6.34539 23.9525 6.21831 24.037 6.07439 24.0756C5.93047 24.1142 5.77774 24.1047 5.63982 24.0486C5.5019 23.9924 5.38648 23.8928 5.31142 23.7652C4.85434 24.0109 4.31949 24.0732 3.81737 23.9393L2.50711 23.5911C1.9861 23.4525 1.54195 23.1144 1.27234 22.6513C1.00272 22.1882 0.92971 21.6379 1.06935 21.1215L1.59563 19.1735C1.73533 18.657 2.07632 18.2166 2.54358 17.9492C3.01085 17.6819 3.56613 17.6094 4.08729 17.7478L5.39755 18.0953C5.85329 18.2163 6.23172 18.4818 6.49486 18.8287C7.12267 17.9625 7.94965 17.2571 8.9073 16.7708C9.86496 16.2845 10.9257 16.0314 12.0017 16.0324C13.0772 16.0317 14.1373 16.2848 15.0945 16.7708C16.0516 17.2569 16.8782 17.9618 17.5059 18.8273C17.7785 18.469 18.1644 18.2115 18.6019 18.096L19.9121 17.7485C20.4332 17.6101 20.9884 17.6824 21.4556 17.9497C21.9229 18.2169 22.2639 18.6571 22.4038 19.1735L22.9307 21.1221C22.9999 21.378 23.0175 21.6448 22.9826 21.9073C22.9476 22.1699 22.8609 22.423 22.7272 22.6524C22.5936 22.8817 22.4157 23.0827 22.2037 23.2439C21.9917 23.405 21.7497 23.5233 21.4916 23.5917L20.182 23.9393C19.6808 24.0733 19.1468 24.0117 18.69 23.7672C18.6147 23.8947 18.4992 23.994 18.3612 24.0499C18.2232 24.1057 18.0705 24.115 17.9267 24.0762C17.7829 24.0374 17.6559 23.9527 17.5655 23.8353C17.4751 23.7178 17.4263 23.5741 17.4266 23.4264V22.7542C17.4267 22.5017 17.409 22.2494 17.3737 21.9993L13.8444 22.937C13.6806 23.2846 13.4201 23.5786 13.0936 23.7846C12.7671 23.9906 12.3881 24.1 12.0011 24.1C11.614 24.1 11.235 23.9906 10.9085 23.7846C10.582 23.5786 10.3216 23.2846 10.1578 22.937L6.62846 21.9993ZM10.0479 21.5154C10.1389 21.2089 10.3019 20.9282 10.5235 20.6963C10.7452 20.4644 11.0191 20.2878 11.3229 20.1811V17.4184C10.3716 17.5376 9.46914 17.9043 8.70715 18.4811C7.94517 19.058 7.35082 19.8245 6.98451 20.7027L10.0479 21.5154ZM17.0176 20.702C16.6512 19.8239 16.0568 19.0576 15.2948 18.4808C14.5329 17.9041 13.6304 17.5376 12.6793 17.4184V20.1804C13.2923 20.3955 13.7711 20.8929 13.9542 21.516L17.0176 20.702ZM18.4737 20.2181C18.4506 20.1328 18.4447 20.0439 18.4563 19.9563C18.4679 19.8688 18.4968 19.7844 18.5413 19.7079C18.5859 19.6314 18.6452 19.5644 18.7158 19.5107C18.7865 19.4569 18.8671 19.4175 18.9532 19.3946L20.2634 19.0465C20.4371 19.0005 20.6221 19.0247 20.7777 19.1138C20.9334 19.2029 21.047 19.3496 21.0935 19.5217L21.6205 21.4697C21.6436 21.5549 21.6495 21.6439 21.6379 21.7314C21.6263 21.8189 21.5974 21.9034 21.5528 21.9798C21.5083 22.0563 21.449 22.1233 21.3784 22.1771C21.3077 22.2308 21.227 22.2702 21.141 22.2931L19.8307 22.6413C19.7447 22.6641 19.6549 22.67 19.5665 22.6584C19.4782 22.6469 19.393 22.6182 19.3158 22.574C19.2387 22.5298 19.1711 22.4709 19.1169 22.4008C19.0627 22.3307 19.023 22.2507 19 22.1654L18.4737 20.2181ZM3.73667 19.0465C3.65059 19.0235 3.56078 19.0175 3.47239 19.029C3.384 19.0405 3.29875 19.0691 3.22153 19.1132C3.14431 19.1574 3.07662 19.2162 3.02234 19.2862C2.96806 19.3563 2.92826 19.4363 2.90521 19.5217L2.37893 21.469C2.35586 21.5543 2.34995 21.6432 2.36156 21.7307C2.37317 21.8183 2.40206 21.9027 2.44658 21.9791C2.49111 22.0556 2.5504 22.1226 2.62106 22.1764C2.69172 22.2301 2.77237 22.2696 2.85841 22.2924L4.16867 22.6406C4.2547 22.6635 4.34444 22.6693 4.43276 22.6578C4.52107 22.6463 4.60623 22.6177 4.68338 22.5736C4.76053 22.5294 4.82815 22.4707 4.88238 22.4006C4.93661 22.3306 4.97639 22.2507 4.99945 22.1654L5.52573 20.2174C5.5489 20.1321 5.55489 20.0431 5.54333 19.9555C5.53177 19.8678 5.5029 19.7834 5.45836 19.7068C5.41383 19.6303 5.35451 19.5632 5.2838 19.5094C5.21308 19.4556 5.13236 19.4161 5.04625 19.3933L3.73667 19.0465ZM12.6793 22.082C12.6793 22.2603 12.6078 22.4313 12.4806 22.5573C12.3534 22.6834 12.1809 22.7542 12.0011 22.7542C11.8212 22.7542 11.6487 22.6834 11.5215 22.5573C11.3943 22.4313 11.3229 22.2603 11.3229 22.082C11.3229 21.9038 11.3943 21.7328 11.5215 21.6067C11.6487 21.4807 11.8212 21.4098 12.0011 21.4098C12.1809 21.4098 12.3534 21.4807 12.4806 21.6067C12.6078 21.7328 12.6793 21.9038 12.6793 22.082Z"
            />
          </mask>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18.3516 8.31574C18.1054 8.50731 17.786 8.66057 17.4008 8.78492C17.4745 9.53168 17.3897 10.2855 17.1519 10.9978C16.9141 11.7101 16.5285 12.3653 16.0199 12.921C15.5113 13.4768 14.891 13.921 14.1989 14.2249C13.5067 14.5289 12.7581 14.6859 12.0011 14.6859C11.244 14.6859 10.4954 14.5289 9.80326 14.2249C9.11112 13.921 8.49083 13.4768 7.98225 12.921C7.47367 12.3653 7.08808 11.7101 6.85025 10.9978C6.61242 10.2855 6.52763 9.53168 6.60133 8.78492C6.21612 8.66057 5.89669 8.50731 5.65119 8.31574C5.33244 8.06703 5.11881 7.73498 5.09372 7.3357C5.06998 6.96533 5.21783 6.65075 5.36567 6.42893C5.51162 6.21882 5.68493 6.02874 5.8811 5.86362C5.97604 5.78094 6.06963 5.70768 6.15644 5.64382C6.13067 5.50602 6.10219 5.33932 6.0737 5.1464C5.95356 4.2991 5.89463 3.44438 5.89737 2.58875C5.89737 2.37769 5.98825 2.2204 6.0303 2.15385C6.0832 2.06983 6.14559 1.9979 6.20256 1.9401C6.31581 1.82246 6.4623 1.70282 6.62303 1.58787C6.94856 1.35395 7.39617 1.09113 7.92787 0.845112C8.98787 0.354419 10.4439 -0.0999756 12.0011 -0.0999756C13.5589 -0.0999756 15.0143 0.355092 16.0743 0.845112C16.5314 1.05233 16.9682 1.30098 17.3791 1.58787C17.5398 1.70282 17.6863 1.82314 17.7996 1.9401C17.8565 1.9979 17.9189 2.06983 17.9718 2.15385C18.0139 2.2204 18.1048 2.37769 18.1048 2.58875C18.1048 3.66559 18.0166 4.53808 17.9284 5.1464C17.8999 5.33932 17.8715 5.50602 17.8457 5.64382C17.9325 5.70768 18.0268 5.78094 18.1217 5.86362C18.2913 6.01083 18.4852 6.2024 18.6365 6.42893C18.785 6.65075 18.9321 6.96533 18.9091 7.33637C18.884 7.73498 18.6704 8.06703 18.3516 8.31574ZM7.25511 2.80251C7.26528 3.70861 7.34123 4.44128 7.41651 4.95349C7.43415 5.07448 7.45178 5.18203 7.46806 5.27748H16.5341C16.551 5.18203 16.568 5.07381 16.5856 4.95349C16.6602 4.44128 16.7369 3.70861 16.747 2.80251C16.6942 2.75827 16.6397 2.71612 16.5836 2.67614C16.3388 2.5007 15.9671 2.27955 15.5005 2.06378C14.5626 1.62955 13.3059 1.24439 12.0011 1.24439C10.6962 1.24439 9.43955 1.62955 8.50162 2.06378C8.03502 2.27955 7.66337 2.5007 7.41923 2.67546C7.36284 2.71587 7.30809 2.7578 7.25511 2.80251ZM7.10997 6.62184L7.10794 6.62319C6.99089 6.70049 6.87877 6.7849 6.77224 6.87593C6.65152 6.98079 6.55521 7.08296 6.49689 7.17169C6.48301 7.19164 6.47055 7.21253 6.45959 7.2342C6.46919 7.24289 6.47915 7.25118 6.48943 7.25907C6.59116 7.33839 6.80954 7.45468 7.23544 7.56962C7.31953 7.59247 7.40973 7.61398 7.50603 7.63549L7.51214 7.63684C7.85259 7.71145 8.27171 7.778 8.78238 7.83043C9.50601 7.90504 10.4168 7.95411 11.5548 7.96486L12.0011 7.96621C14.1896 7.96621 15.605 7.8311 16.4907 7.63684L16.4961 7.63549C16.5931 7.61398 16.6833 7.59247 16.7674 7.56962C17.1926 7.45535 17.4116 7.33839 17.5127 7.25907C17.523 7.25118 17.5329 7.24289 17.5425 7.2342C17.5318 7.21255 17.5196 7.19167 17.5059 7.17169C17.427 7.06182 17.3343 6.96242 17.2299 6.87593C17.1236 6.78491 17.0117 6.7005 16.8949 6.62319L16.8922 6.62184H7.10997ZM11.8166 9.31057C13.6084 9.31057 14.9973 9.21646 16.0621 9.05245C16.0971 9.60049 16.0188 10.1498 15.832 10.6668C15.6452 11.1838 15.3539 11.6576 14.9759 12.059C14.5978 12.4605 14.1411 12.7812 13.6336 13.0015C13.1261 13.2218 12.5785 13.3371 12.0245 13.3403C11.4705 13.3434 10.9216 13.2344 10.4116 13.0199C9.90155 12.8054 9.44109 12.4899 9.05842 12.0928C8.67576 11.6957 8.37894 11.2253 8.18617 10.7105C7.9934 10.1957 7.90873 9.64724 7.93736 9.09883C8.92955 9.23461 10.2012 9.31057 11.8166 9.31057ZM6.62846 21.9993C6.59312 22.2494 6.57544 22.5017 6.57556 22.7542V23.4264C6.57564 23.5742 6.52658 23.7178 6.43599 23.8352C6.34539 23.9525 6.21831 24.037 6.07439 24.0756C5.93047 24.1142 5.77774 24.1047 5.63982 24.0486C5.5019 23.9924 5.38648 23.8928 5.31142 23.7652C4.85434 24.0109 4.31949 24.0732 3.81737 23.9393L2.50711 23.5911C1.9861 23.4525 1.54195 23.1144 1.27234 22.6513C1.00272 22.1882 0.92971 21.6379 1.06935 21.1215L1.59563 19.1735C1.73533 18.657 2.07632 18.2166 2.54358 17.9492C3.01085 17.6819 3.56613 17.6094 4.08729 17.7478L5.39755 18.0953C5.85329 18.2163 6.23172 18.4818 6.49486 18.8287C7.12267 17.9625 7.94965 17.2571 8.9073 16.7708C9.86496 16.2845 10.9257 16.0314 12.0017 16.0324C13.0772 16.0317 14.1373 16.2848 15.0945 16.7708C16.0516 17.2569 16.8782 17.9618 17.5059 18.8273C17.7785 18.469 18.1644 18.2115 18.6019 18.096L19.9121 17.7485C20.4332 17.6101 20.9884 17.6824 21.4556 17.9497C21.9229 18.2169 22.2639 18.6571 22.4038 19.1735L22.9307 21.1221C22.9999 21.378 23.0175 21.6448 22.9826 21.9073C22.9476 22.1699 22.8609 22.423 22.7272 22.6524C22.5936 22.8817 22.4157 23.0827 22.2037 23.2439C21.9917 23.405 21.7497 23.5233 21.4916 23.5917L20.182 23.9393C19.6808 24.0733 19.1468 24.0117 18.69 23.7672C18.6147 23.8947 18.4992 23.994 18.3612 24.0499C18.2232 24.1057 18.0705 24.115 17.9267 24.0762C17.7829 24.0374 17.6559 23.9527 17.5655 23.8353C17.4751 23.7178 17.4263 23.5741 17.4266 23.4264V22.7542C17.4267 22.5017 17.409 22.2494 17.3737 21.9993L13.8444 22.937C13.6806 23.2846 13.4201 23.5786 13.0936 23.7846C12.7671 23.9906 12.3881 24.1 12.0011 24.1C11.614 24.1 11.235 23.9906 10.9085 23.7846C10.582 23.5786 10.3216 23.2846 10.1578 22.937L6.62846 21.9993ZM10.0479 21.5154C10.1389 21.2089 10.3019 20.9282 10.5235 20.6963C10.7452 20.4644 11.0191 20.2878 11.3229 20.1811V17.4184C10.3716 17.5376 9.46914 17.9043 8.70715 18.4811C7.94517 19.058 7.35082 19.8245 6.98451 20.7027L10.0479 21.5154ZM17.0176 20.702C16.6512 19.8239 16.0568 19.0576 15.2948 18.4808C14.5329 17.9041 13.6304 17.5376 12.6793 17.4184V20.1804C13.2923 20.3955 13.7711 20.8929 13.9542 21.516L17.0176 20.702ZM18.4737 20.2181C18.4506 20.1328 18.4447 20.0439 18.4563 19.9563C18.4679 19.8688 18.4968 19.7844 18.5413 19.7079C18.5859 19.6314 18.6452 19.5644 18.7158 19.5107C18.7865 19.4569 18.8671 19.4175 18.9532 19.3946L20.2634 19.0465C20.4371 19.0005 20.6221 19.0247 20.7777 19.1138C20.9334 19.2029 21.047 19.3496 21.0935 19.5217L21.6205 21.4697C21.6436 21.5549 21.6495 21.6439 21.6379 21.7314C21.6263 21.8189 21.5974 21.9034 21.5528 21.9798C21.5083 22.0563 21.449 22.1233 21.3784 22.1771C21.3077 22.2308 21.227 22.2702 21.141 22.2931L19.8307 22.6413C19.7447 22.6641 19.6549 22.67 19.5665 22.6584C19.4782 22.6469 19.393 22.6182 19.3158 22.574C19.2387 22.5298 19.1711 22.4709 19.1169 22.4008C19.0627 22.3307 19.023 22.2507 19 22.1654L18.4737 20.2181ZM3.73667 19.0465C3.65059 19.0235 3.56078 19.0175 3.47239 19.029C3.384 19.0405 3.29875 19.0691 3.22153 19.1132C3.14431 19.1574 3.07662 19.2162 3.02234 19.2862C2.96806 19.3563 2.92826 19.4363 2.90521 19.5217L2.37893 21.469C2.35586 21.5543 2.34995 21.6432 2.36156 21.7307C2.37317 21.8183 2.40206 21.9027 2.44658 21.9791C2.49111 22.0556 2.5504 22.1226 2.62106 22.1764C2.69172 22.2301 2.77237 22.2696 2.85841 22.2924L4.16867 22.6406C4.2547 22.6635 4.34444 22.6693 4.43276 22.6578C4.52107 22.6463 4.60623 22.6177 4.68338 22.5736C4.76053 22.5294 4.82815 22.4707 4.88238 22.4006C4.93661 22.3306 4.97639 22.2507 4.99945 22.1654L5.52573 20.2174C5.5489 20.1321 5.55489 20.0431 5.54333 19.9555C5.53177 19.8678 5.5029 19.7834 5.45836 19.7068C5.41383 19.6303 5.35451 19.5632 5.2838 19.5094C5.21308 19.4556 5.13236 19.4161 5.04625 19.3933L3.73667 19.0465ZM12.6793 22.082C12.6793 22.2603 12.6078 22.4313 12.4806 22.5573C12.3534 22.6834 12.1809 22.7542 12.0011 22.7542C11.8212 22.7542 11.6487 22.6834 11.5215 22.5573C11.3943 22.4313 11.3229 22.2603 11.3229 22.082C11.3229 21.9038 11.3943 21.7328 11.5215 21.6067C11.6487 21.4807 11.8212 21.4098 12.0011 21.4098C12.1809 21.4098 12.3534 21.4807 12.4806 21.6067C12.6078 21.7328 12.6793 21.9038 12.6793 22.082Z"
            fill="#777E91"
            stroke="#777E91"
            mask="url(#path-2-inside-1_7814_27376)"
          />
        </g>
        <defs>
          <clipPath id="clip0_7814_27376">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </span>
  );
};