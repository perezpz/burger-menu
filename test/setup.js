import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import sinon from 'sinon';


global.sinon = sinon;
global.shallow = shallow;

configure({ adapter: new Adapter() });
