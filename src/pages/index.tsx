import AboutPage from './About/About'
import RecoverPassword from './auth/recover-password'
import { ResetPassword } from './auth/reset-password'
import SignIn from './auth/sign-in'
import SignUp from './auth/sign-up'
import Hints from './hint/hints/Hints';
import Hint from './hint/hintSingle/Hint';
import Home from './Home'
import NoMatchPage from './no-match-page'
import { CreateOrder } from './order/CreateOrder/CreateOrder';
import Order from './orders/Order'
import { Orders } from './orders/Orders'
import { CompletedPayment } from './payment/CompletedPayment'
import Policy from './policy/Policy'
import ProfileActivatePage from './profile/profile-activate-page'
import ProfilePage from './profile/profile-page'

export {
  ResetPassword, ProfilePage, NoMatchPage, Home, Policy, Orders,
  Order, RecoverPassword, SignIn, SignUp, AboutPage, CreateOrder,
  ProfileActivatePage, CompletedPayment,Hints,Hint
}
