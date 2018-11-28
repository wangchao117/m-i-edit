/**
 * A keypad that includes all of the expression symbols.
 */

const React = require('react');
const { connect } = require('react-redux');
const { StyleSheet } = require('aphrodite');

const { View } = require('../fake-react-native-web');
const TwoPageKeypad = require('./two-page-keypad');
const ManyKeypadButton = require('./many-keypad-button');
const TouchableKeypadButton = require('./touchable-keypad-button');
const {
    row,
    column,
    oneColumn,
    fullWidth,
    roundedTopLeft,
    roundedTopRight,
} = require('./styles');
const { BorderStyles } = require('../consts');
const { valueGrey, controlGrey } = require('./common-style');
const { cursorContextPropType, keyIdPropType } = require('./prop-types');
const KeyConfigs = require('../data/key-configs');
const CursorContexts = require('./input/cursor-contexts');

class ExpressionKeypad extends React.Component {
    static propTypes = {
        currentPage: React.PropTypes.number.isRequired,
        cursorContext: cursorContextPropType.isRequired,
        dynamicJumpOut: React.PropTypes.bool,
        extraKeys: React.PropTypes.arrayOf(keyIdPropType),
        roundTopLeft: React.PropTypes.bool,
        roundTopRight: React.PropTypes.bool,
    };
    // 发现重要线索，实践证明这个变动，按钮大小会改变，可以更据实际情况调整行列以及调整view-pager.js的百分比来适应屏幕宽度
    static rows = 4;
    static columns = 5;

    // Though we include an infinite-key popover in the bottom-left, it's
    // assumed that we don't need to accommodate cases in which that key
    // contains more than four children.
    static maxVisibleRows = 4;

    // static numPages = 2;
    // 变为3个tab
    static numPages = 3;

    render() {
        const {
            currentPage,
            cursorContext,
            dynamicJumpOut,
            extraKeys,
            roundTopLeft,
            roundTopRight,
        } = this.props;

        let dismissOrJumpOutKey;
        if (dynamicJumpOut) {
            switch (cursorContext) {
                case CursorContexts.IN_PARENS:
                    dismissOrJumpOutKey = KeyConfigs.JUMP_OUT_PARENTHESES;
                    break;

                case CursorContexts.IN_SUPER_SCRIPT:
                    dismissOrJumpOutKey = KeyConfigs.JUMP_OUT_EXPONENT;
                    break;

                case CursorContexts.IN_SUB_SCRIPT:
                    dismissOrJumpOutKey = KeyConfigs.JUMP_OUT_BASE;
                    break;

                case CursorContexts.BEFORE_FRACTION:
                    dismissOrJumpOutKey = KeyConfigs.JUMP_INTO_NUMERATOR;
                    break;

                case CursorContexts.IN_NUMERATOR:
                    dismissOrJumpOutKey = KeyConfigs.JUMP_OUT_NUMERATOR;
                    break;

                case CursorContexts.IN_DENOMINATOR:
                    dismissOrJumpOutKey = KeyConfigs.JUMP_OUT_DENOMINATOR;
                    break;

                case CursorContexts.NONE:
                default:
                    dismissOrJumpOutKey = KeyConfigs.DISMISS;
                    break;
            }
        } else {
            dismissOrJumpOutKey = KeyConfigs.DISMISS;
        }

        const rightPageStyle = [
            row,
            fullWidth,
            styles.rightPage,
            roundTopRight && roundedTopRight,
        ];
        const rightPage = <View style={rightPageStyle}>
            <View style={[column, oneColumn]}>
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.NUM_7}
                    borders={BorderStyles.NONE}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.NUM_4}
                    borders={BorderStyles.NONE}
                />
                {/* <TouchableKeypadButton
                    keyConfig={KeyConfigs.NUM_1}
                    borders={BorderStyles.BOTTOM}
                /> */}
                <ManyKeypadButton
                    keys={['a', 'b']}
                    borders={BorderStyles.TOP}
                />
                {/* 左下集合按钮位置 */}
                <ManyKeypadButton
                    keys={extraKeys}
                    borders={BorderStyles.TOP}
                />
            </View>
            <View style={[column, oneColumn]}>
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.NUM_8}
                    borders={BorderStyles.NONE}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.NUM_5}
                    borders={BorderStyles.NONE}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.NUM_2}
                    borders={BorderStyles.NONE}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.NUM_0}
                    borders={BorderStyles.LEFT}
                />
            </View>
            <View style={[column, oneColumn]}>
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.NUM_9}
                    borders={BorderStyles.NONE}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.NUM_6}
                    borders={BorderStyles.NONE}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.NUM_3}
                    borders={BorderStyles.BOTTOM}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.DECIMAL}
                    borders={BorderStyles.LEFT}
                />
            </View>
            <View style={[column, oneColumn]}>
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.DIVIDE}
                    borders={BorderStyles.LEFT}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.TIMES}
                    borders={BorderStyles.LEFT}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.MINUS}
                    borders={BorderStyles.LEFT}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.PLUS}
                    borders={BorderStyles.LEFT}
                />
            </View>
            <View style={[column, oneColumn]}>
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.FRAC_INCLUSIVE}
                    style={roundTopRight && roundedTopRight}
                />
                <TouchableKeypadButton keyConfig={KeyConfigs.CDOT} />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.BACKSPACE}
                    borders={BorderStyles.LEFT}
                />
                <TouchableKeypadButton
                    keyConfig={dismissOrJumpOutKey}
                    borders={BorderStyles.LEFT}
                />
                {/* 将收起键盘按钮换成确认按钮 */}
                {/* <TouchableKeypadButton
                    keyConfig={KeyConfigs.SUREBTN}
                    borders={BorderStyles.LEFT}
                /> */}
            </View>
            
        </View>;

        const middlePageStyle = [
            row,
            fullWidth,
            styles.leftPage,
            roundTopLeft && roundedTopLeft,
        ];
        const middlepage = <View style={middlePageStyle}>
            <View style={[column, oneColumn]}>
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.EXP_2}
                    borders={BorderStyles.NONE}
                    style={roundTopLeft && roundedTopLeft}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.SQRT}
                    borders={BorderStyles.NONE}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.LOG}
                    borders={BorderStyles.BOTTOM}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.SIN}
                    borders={BorderStyles.NONE}
                />
            </View>
            <View style={[column, oneColumn]}>
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.EXP_3}
                    borders={BorderStyles.NONE}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.CUBE_ROOT}
                    borders={BorderStyles.NONE}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.LN}
                    borders={BorderStyles.BOTTOM}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.COS}
                    borders={BorderStyles.NONE}
                />
            </View>
            <View style={[column, oneColumn]}>
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.EXP}
                    borders={BorderStyles.NONE}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.RADICAL}
                    borders={BorderStyles.NONE}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.LOG_N}
                    borders={BorderStyles.BOTTOM}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.TAN}
                    borders={BorderStyles.NONE}
                />
            </View>
            <View style={[column, oneColumn]}>
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.GEQ}
                    borders={BorderStyles.LEFT}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.EQUAL}
                    borders={BorderStyles.LEFT}
                />
                <TouchableKeypadButton keyConfig={KeyConfigs.LEQ} />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.LEFT_PAREN}
                    borders={BorderStyles.LEFT}
                />
            </View>
            <View style={[column, oneColumn]}>
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.GT}
                    borders={BorderStyles.NONE}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.NEQ}
                    borders={BorderStyles.NONE}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.LT}
                    borders={BorderStyles.BOTTOM}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.RIGHT_PAREN}
                    borders={BorderStyles.NONE}
                />
            </View>
            {/* 新增一列，不要再多了，不然格子宽度不够 最多容下6列*/}
            <View style={[column, oneColumn]}>
                {/* 新增一行 */}
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.COS}
                    borders={BorderStyles.NONE}
                />
                {/* 新增一行 */}
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.COS}
                    borders={BorderStyles.NONE}
                />
                {/* 新增一行 */}
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.COS}
                    borders={BorderStyles.BOTTOM}
                />
                {/* 新增一行 */}
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.COS}
                    borders={BorderStyles.NONE}
                />
            </View>

        </View>;      

        const leftPageStyle = [
            row,
            fullWidth,
            styles.leftPage,
            roundTopLeft && roundedTopLeft,
        ];
        const leftPage = <View style={leftPageStyle}>
            <View style={[column, oneColumn]}>
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.EXP_2}
                    borders={BorderStyles.NONE}
                    style={roundTopLeft && roundedTopLeft}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.SQRT}
                    borders={BorderStyles.NONE}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.LOG}
                    borders={BorderStyles.BOTTOM}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.SIN}
                    borders={BorderStyles.NONE}
                />
            </View>
            <View style={[column, oneColumn]}>
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.EXP_3}
                    borders={BorderStyles.NONE}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.CUBE_ROOT}
                    borders={BorderStyles.NONE}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.LN}
                    borders={BorderStyles.BOTTOM}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.COS}
                    borders={BorderStyles.NONE}
                />
            </View>
            <View style={[column, oneColumn]}>
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.EXP}
                    borders={BorderStyles.NONE}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.RADICAL}
                    borders={BorderStyles.NONE}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.LOG_N}
                    borders={BorderStyles.BOTTOM}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.TAN}
                    borders={BorderStyles.NONE}
                />
            </View>
            <View style={[column, oneColumn]}>
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.GEQ}
                    borders={BorderStyles.LEFT}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.EQUAL}
                    borders={BorderStyles.LEFT}
                />
                <TouchableKeypadButton keyConfig={KeyConfigs.LEQ} />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.LEFT_PAREN}
                    borders={BorderStyles.LEFT}
                />
            </View>
            <View style={[column, oneColumn]}>
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.GT}
                    borders={BorderStyles.NONE}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.NEQ}
                    borders={BorderStyles.NONE}
                />
                {/* <TouchableKeypadButton
                    keyConfig={KeyConfigs.EQUIV}
                    borders={BorderStyles.NONE}
                /> */}
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.LT}
                    borders={BorderStyles.BOTTOM}
                />
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.RIGHT_PAREN}
                    borders={BorderStyles.NONE}
                />
            </View>
            {/* 新增一列，不要再多了，不然格子宽度不够 最多容下6列*/}
            <View style={[column, oneColumn]}>
                {/* 新增一行 */}
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.COS}
                    borders={BorderStyles.NONE}
                />
                {/* 新增一行 */}
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.COS}
                    borders={BorderStyles.NONE}
                />
                {/* 新增一行 */}
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.COS}
                    borders={BorderStyles.BOTTOM}
                />
                {/* 新增一行 */}
                <TouchableKeypadButton
                    keyConfig={KeyConfigs.COS}
                    borders={BorderStyles.NONE}
                />
            </View>

        </View>;
        return <TwoPageKeypad
            currentPage={currentPage}
            rightPage={rightPage}
            middlepage={middlepage}
            leftPage={leftPage}
        />;
    }
}

const styles = StyleSheet.create({
    // NOTE(charlie): These backgrounds are applied to as to fill in some
    // unfortunate 'cracks' in the layout. However, not all keys in the first
    // page use this background color (namely, the 'command' keys, backspace and
    // dismiss).
    // TODO(charlie): Apply the proper background between the 'command' keys.
    rightPage: {
        backgroundColor: valueGrey,
    },

    leftPage: {
        backgroundColor: controlGrey,
    },
});

const mapStateToProps = (state) => {
    return {
        currentPage: state.pager.currentPage,
        cursorContext: state.input.cursor.context,
        dynamicJumpOut: !state.layout.navigationPadEnabled,
    };
};

module.exports = connect(mapStateToProps)(ExpressionKeypad);
