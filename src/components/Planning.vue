<template>
  <div>
    <h2>
      <i class="el-icon-s-opportunity" />レース計画<el-button
        icon="el-icon-question"
        type="text"
        class="help-button"
        @click="showModal(true, 'help-0')"
      />
    </h2>
    <modal
      name="help-0"
      width="90%"
      height="auto"
      :scrollable="true"
      class="help-modal"
      ><h3><i class="el-icon-question" /> 現在実装されている機能</h3>
      <div class="help-modal-text">
        <li>出場レースのプランニングができます。</li>
        <li>プランニングされたスケジュールを個別に編集することが出来ます。</li>
        <li>
          プランニングされた出走レースのスケジュールを時系列形式で確認することが出来ます。
        </li>
      </div>
      <h3><i class="el-icon-question" /> 細かな仕様</h3>
      <div class="help-modal-text">
        <li>
          予想獲得ファン数の値は<b>「出走レースに全て勝利した場合のファン数最低値」</b>です。実際には獲得ファン数はある程度ランダムであり、出走レースに全て勝利した場合の実際のファン数は予測値の1.00倍~1.09倍の範囲まで変動します。
        </li>

        <li>
          一部ウマ娘において、適正の合わないレースに出走する場合(いわゆる<b>「負けイベント」</b>)ではファン数をカウントしない(0人扱い)ように配慮し、現実的に達成可能なプランとします。「負けイベント」であるかどうかはフィールドと距離の適正がAから合計で<b>2段階以上</b>下回っているかで判定しており、「詳細設定」から適正調節を行うことで判定が変更となる場合があります(例：マルゼンスキーの有馬記念は通常「負けイベント」扱いになりますが、長距離適性を上げることで判定が変更されます)。
        </li>
        <li>
          オグリキャップ・スマートファルコンなどのシナリオにおける「特定のクラスのレースで○回1着」という形式の目標にもある程度対応しています。ただし着順を考慮していません。つまり、「条件を満たすクラスのレースに○回以上出走する」と解釈してプランを作成しています。
        </li>
        <li>
          URAシナリオにおいて、メイクデビュー戦およびURAファイナルズのファン数は固定値として加算しています(メイクデビュー戦で1着を取れなかった場合のジュニア未勝利戦には対応していません)。
        </li>
        <li>
          URAシナリオにおいて、ダート系のウマ娘は固有スキルレベルアップに必要なファン数条件が緩和される仕様に対応済です。
        </li>
        <li>
          サイト上に明記していませんが、各レースの出走に必要なファン数条件を考慮したプランニングになっています(「メイクデビュー戦の次に皐月賞」などというようなプランは排除されているはずです、またファン数ボーナスが低すぎるとメイクデビュー戦の次にホープフルS等に出られなくなるはずです)。
        </li>
        <li>
          最大連続出場レース数は目標外レースに関する設定です。例えば値を2に設定した場合、「目標外・目標外・目標外」「目標外・目標・目標外」というパターンは制限しますが、「目標外・目標外・目標」というようなパターンは制限しません。なお体力0によるレース疲れのリスクは考慮していません。
        </li>
        <li>
          特にダートや短距離系のウマ娘は、初期設定では条件を満たすプランを作成できない場合があります。この場合はファン数ノルマの一部を無効にしたり、ファン数ボーナスをより高い値にするなど、条件を緩和することで実現可能なプランを作成可能です。
        </li>
        <li>
          マチカネフクキタルの第2・7目標レースはランダムに決定されますが、こちらは毎日杯・函館記念に固定しています。
        </li>
        <li>
          フジキセキのシナリオにおける目標分岐は三冠路線に固定しています。
        </li>
      </div>
      <h3><i class="el-icon-question" /> 未実装・不十分な機能</h3>
      <div class="help-modal-text">
        <div>
          <li>
            一部ウマ娘の隠しイベント達成を優先するようなプランニング(カレンチャンのサマースプリントシリーズ制覇など)に対応していません(実装検討中)。
          </li>
          <li>
            育成が途中まで終了した段階からプランニングを行うような機能を検討中です。
          </li>
        </div>
      </div>
      <el-button
        type="danger"
        round
        class="btn btn-default"
        @click="showModal(false, 'help-0')"
      >
        閉じる
      </el-button>
    </modal>
    <h3>
      <i class="el-icon-s-flag"></i> シナリオ・キャラクター・戦略選択<el-button
        icon="el-icon-question"
        type="text"
        class="help-button"
        @click="showModal(true, 'help-1')"
      />
    </h3>
    <modal
      name="help-1"
      width="90%"
      height="auto"
      :scrollable="true"
      class="help-modal"
      ><h3><i class="el-icon-question" /> 使い方</h3>
      <div class="help-modal-text">
        <p>
          <b>『シナリオ・キャラクター・戦略選択』</b
          >では、スケジュール作成のための基本情報を設定できます。これらの項目を変更すると<b>自動的におすすめのスケジュールが再設定</b>されます(レースカレンダーで個別に編集した内容は上書きされるので注意してください)。
        </p>
        <h4><i class="el-icon-caret-bottom" />シナリオ</h4>
        <p>育成シナリオを選択できます。</p>
        <h4><i class="el-icon-caret-bottom" />キャラクター</h4>
        <p>育成するキャラクターを選択できます。</p>
        <h4><i class="el-icon-caret-bottom" />戦略</h4>
        <p>
          おすすめスケジュールの作成における基本方針が設定できます。<b>「ファン数最大化」・「ノルマ達成効率重視」</b>の2つの戦略が利用可能です。<b>「ファン数最大化」</b>ではシナリオ等の制約下で可能な限りファン数を稼ぐためにレースに出場します(ファン活・金策向け)。<b>「ノルマ達成効率重視」</b>ではシナリオ上達成すべきファン数のノルマをなるべく少ない出走数で満たすことを目標とします。
        </p>
      </div>
      <el-button
        type="danger"
        round
        class="btn btn-default"
        @click="showModal(false, 'help-1')"
      >
        閉じる
      </el-button>
    </modal>
    <el-form :inline="true" ref="form-scenario" class="form" size="small">
      <el-form-item label="シナリオ">
        <el-select v-model="scenario" placeholder="Select">
          <el-option
            v-for="sce in scenarios"
            :key="sce"
            :label="sce"
            :value="sce"
            @change="setCalendar(true)"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="キャラクター">
        <el-select
          v-model="character"
          placeholder="Select"
          value-key="id"
          @change="setFanQuota(), setCalendar(true)"
        >
          <el-option
            v-for="cha in $store.state.characters.filter(function (item) {
              if (item.flag === 1) return true;
            })"
            :key="cha.id"
            :value="cha"
            :label="cha.name"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="戦略">
        <el-select
          v-model="strategy"
          placeholder="Select"
          value-key="name"
          @change="setCalendar(true)"
        >
          <el-option
            v-for="str in strategies"
            :key="str.name"
            :value="str"
            :label="str.text"
            @change="setCalendar(true)"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <h3 class="detail-title">
      <i class="el-icon-s-tools" /> 詳細設定<el-button
        icon="el-icon-question"
        type="text"
        class="help-button"
        @click="showModal(true, 'help-2')"
      />
    </h3>
    <modal
      name="help-2"
      width="90%"
      height="auto"
      :scrollable="true"
      class="help-modal"
      ><h3><i class="el-icon-question" /> 使い方</h3>
      <div class="help-modal-text">
        <p>
          <b>『詳細設定』</b
          >では、スケジュール作成に関わる細かな項目を設定できます。
        </p>
        <h4><i class="el-icon-caret-bottom" />余裕のあるノルマ達成計画(+%)</h4>
        <p>
          予想獲得ファン数は基本的に出走レース全てで1着を取ることが前提となっています(「負けイベント」を除く)が、実際には一部で1着を取り逃すことを想定し、<b>本来のファン数ノルマよりも一定の余裕を持ったスケジューリング</b>を行うことができます。例えば「10%」に設定し、「レジェンド達成(320000人)」のファン数ノルマを有効にした場合、育成終了時に352000人以上のファンを獲得できるようにします(※レースカレンダーから個別に出走レースを編集した場合でもこのノルマ目標を達成できない場合にはアラートが表示されます)。
        </p>
        <h4><i class="el-icon-caret-bottom" />出走適正下限</h4>
        <p>
          出走するレースの適正下限を設定します。適正を満たさないレースは、おすすめのスケジュールの目標外出走対象レースとして選択されないほか、レースカレンダーにも表示されません(ただし、シナリオで目標となっているレースや既に選択中のレースはそのまま表示されます)。
        </p>
        <h4><i class="el-icon-caret-bottom" />ファンボーナス</h4>
        <p>
          サポートカードの編成によって変化するファンボーナスの値を設定できます。
        </p>
        <h4><i class="el-icon-caret-bottom" />最大連続出場レース数</h4>
        <p>
          おすすめのスケジュール作成における最大連続出場レース数を設定できます。<b>『レース疲れ』</b>回避のため、基本的にはこの値を「<b>2</b>」以下に設定することを推奨します。なお目標外レースの後にシナリオで目標となっているレースに連続出走する場合は、『レース疲れ』のペナルティが発生しないため、この設定は無視されます。
        </p>
        <h4>
          <i class="el-icon-caret-bottom" />夏合宿中は目標外レースに出場しない
        </h4>
        <p>
          この項目を有効にすると、おすすめのスケジュール作成において夏合宿期間中は目標外レースに出走しなくなります。
        </p>
        <h4><i class="el-icon-caret-bottom" />適正調節</h4>
        <p>
          因子継承等で適性を補正する場合に対応できます。この項目を変更すると、出走適正下限の設定と合わせて、おすすめのスケジュールでの目標外出走対象やレースカレンダーに表示されるスケジュールが変更されます。また、シナリオで目標となっているレースのうち、ウマ娘の適正に合致していないレース(※フィールド・距離適正がA・Aを合計2段階以上下回っている)は「負けイベント」と扱いファン数に加算しませんが、この項目を変更することによりその判定にも影響が出る場合があります。
        </p>
        <h4><i class="el-icon-caret-bottom" />クラス</h4>
        <p>
          おすすめのスケジュール作成における目標外出走レース対象や、レースカレンダ―に表示するレースのクラスを設定できます(シナリオで目標となっているレースや既に選択中のレースはそのまま表示されます)。おすすめのスケジュール作成のアルゴリズムでは基本的にファン数の多いGⅠやGⅡのレースが選択されやすい為、一般的にこの項目を変更する必要はあまりありません。
        </p>
      </div>
      <el-button
        type="danger"
        round
        class="btn btn-default"
        @click="showModal(false, 'help-2')"
      >
        閉じる
      </el-button>
    </modal>
    <el-collapse class="detail-collapse">
      <el-collapse-item title="">
        <template slot="title" style="width: 100%"> </template>
        <el-form :inline="true" ref="form-method" class="form" size="small">
          <el-form-item label="余裕のあるノルマ達成計画(+%)">
            <el-input-number
              v-model="quota_leeway"
              :min="0"
              :step="5"
              :max="100"
              @change="checkFanAndQuotas()"
            >
            </el-input-number>
          </el-form-item>
          <el-form-item label="出走適正下限">
            <el-select
              v-model="min_app"
              placeholder="Select"
              class="button-app"
              @change="setCalendar(false)"
            >
              <el-option
                v-for="app in appropriate"
                :key="app"
                :label="app"
                :value="app"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="ファンボーナス">
            <el-input-number
              v-model="fan_bonus"
              :min="0"
              :max="200"
              @change="checkFanAndQuotas()"
            >
            </el-input-number>
          </el-form-item>
          <el-form-item label="最大連続出場レース数">
            <el-input-number v-model="race_limit_num" :min="0" :max="72">
            </el-input-number>
          </el-form-item>
          <el-form-item label="夏合宿中は目標外レースに出場しない">
            <el-switch v-model="is_ban_summer"> </el-switch>
          </el-form-item>
          <br />
          <el-form-item label="適正調節 (芝/ダ/短/マ/中/長)">
            <el-select
              v-model="character.field_1"
              placeholder="Select"
              class="button-app"
              @change="setCalendar(false)"
            >
              <el-option
                v-for="app in appropriate"
                :key="app"
                :label="app"
                :value="app"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-select
              v-model="character.field_2"
              placeholder="Select"
              class="button-app"
              @change="setCalendar(false)"
            >
              <el-option
                v-for="app in appropriate"
                :key="app"
                :label="app"
                :value="app"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-select
              v-model="character.distance_1"
              placeholder="Select"
              class="button-app"
              @change="setCalendar(false)"
            >
              <el-option
                v-for="app in appropriate"
                :key="app"
                :label="app"
                :value="app"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-select
              v-model="character.distance_2"
              placeholder="Select"
              class="button-app"
              @change="setCalendar(false)"
            >
              <el-option
                v-for="app in appropriate"
                :key="app"
                :label="app"
                :value="app"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-select
              v-model="character.distance_3"
              placeholder="Select"
              class="button-app"
              @change="setCalendar(false)"
            >
              <el-option
                v-for="app in appropriate"
                :key="app"
                :label="app"
                :value="app"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-select
              v-model="character.distance_4"
              placeholder="Select"
              class="button-app"
              @change="setCalendar(false)"
            >
              <el-option
                v-for="app in appropriate"
                :key="app"
                :label="app"
                :value="app"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="クラス">
            <el-checkbox v-model="classes[0]" @change="setCalendar(false)"
              >GⅠ</el-checkbox
            >
            <el-checkbox v-model="classes[1]" @change="setCalendar(false)"
              >GⅡ</el-checkbox
            >
            <el-checkbox v-model="classes[2]" @change="setCalendar(false)"
              >GⅢ</el-checkbox
            >
            <el-checkbox v-model="classes[3]" @change="setCalendar(false)"
              >OP</el-checkbox
            >
            <el-checkbox v-model="classes[4]" @change="setCalendar(false)"
              >Pre-OP</el-checkbox
            >
          </el-form-item>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <h3 class="quota-title">
      <i class="el-icon-s-order" />ファン数ノルマ一覧<el-button
        icon="el-icon-question"
        type="text"
        class="help-button"
        @click="showModal(true, 'help-3')"
      ></el-button>
    </h3>
    <modal
      name="help-3"
      width="90%"
      height="auto"
      :scrollable="true"
      class="help-modal"
      ><h3><i class="el-icon-question" /> 使い方</h3>
      <div class="help-modal-text">
        <p>
          <b>『ファン数ノルマ一覧』</b
          >では、達成すべきファン数ノルマの一覧を確認したり、各ノルマの有効/無効を切り替えることができます。
        </p>
        <h4><i class="el-icon-caret-bottom" />全体シナリオの目標</h4>
        <p>
          URAシナリオ等で固有スキルレベルアップなどに必要なファン数ノルマです。
        </p>
        <h4><i class="el-icon-caret-bottom" />ウマ娘のシナリオ目標</h4>
        <p>
          一部のウマ娘にはファン数の目標などが設定されています。これらのノルマは必ず達成する必要があるため、<b>無効化することができません</b>。なお、目標人数が「(レース)」となっているものはレース勝利数目標です。
        </p>
      </div>
      <el-button
        type="danger"
        round
        class="btn btn-default"
        @click="showModal(false, 'help-3')"
      >
        閉じる
      </el-button>
    </modal>
    <el-collapse class="quota-collapse">
      <el-collapse-item title="">
        <el-table
          :data="fan_quota"
          class="fan-table"
          align="center"
          width="auto"
        >
          <el-table-column prop="term_id" label="時期" sortable width="180"
            ><template slot-scope="scope">
              {{ calendar[scope.row.term_id - 1].name }}
            </template></el-table-column
          >/>
          <el-table-column prop="num" label="目標人数" width="90"
            ><template slot-scope="scope">
              <template v-if="scope.row.type === 'victory'">(レース)</template>
              <template v-else>{{ scope.row.num }}人</template>
            </template></el-table-column
          >/>
          <el-table-column prop="status" label="有効" width="60"
            ><template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                :disabled="
                  scope.row.type === 'fan' || scope.row.type === 'victory'
                "
                @change="checkFanAndQuotas()"
              >
              </el-switch> </template></el-table-column
          >/>
          <el-table-column prop="text" label="詳細" width="360" />
        </el-table>
      </el-collapse-item>
    </el-collapse>
    <el-button
      type="warning"
      round
      class="btn btn-default"
      @click="setCalendar(true)"
    >
      おすすめのスケジュールを作成
    </el-button>
    <el-alert
      show-icon
      type="error"
      class="sticky-alert"
      :closable="false"
      v-if="is_failed"
      >ノルマを達成できません！設定・ノルマ・出走レースなどの変更を検討してください。</el-alert
    >
    <el-alert
      show-icon
      type="success"
      class="sticky-alert"
      :closable="false"
      v-else
      ><b>予想獲得ファン数</b>：{{
        (fan_sum * (1 + fan_bonus / 100)).toFixed(0)
      }}人 (～
      {{ (1.09 * fan_sum * (1 + fan_bonus / 100)).toFixed(0) }}人)<el-button
        type="primary"
        round
        size="medium"
        class="btn btn-default"
        @click="showModal(true, 'activities')"
      >
        <i class="el-icon-s-data" />出走スケジュール
      </el-button></el-alert
    >
    <modal
      name="activities"
      class="activities-modal"
      width="90%"
      height="auto"
      :scrollable="true"
    >
      <h3><i class="el-icon-s-data" /> 出走スケジュール</h3>
      <p>
        出走レース数合計：<b>{{ activities.length }}</b>
      </p>
      <el-timeline>
        <el-timeline-item
          class="timeline"
          v-for="(activity, index) in activities"
          :key="index"
          :icon="activity.icon"
          :type="activity.type"
          :color="activity.color"
          :size="activity.size"
          :timestamp="activity.term"
          placement="top"
        >
          <el-card
            class="box-card4"
            :class="borderColor(activity)"
            :key="activity.id"
            shadow="hover"
          >
            <div class="race-text">
              <p class="box-text1">
                <b>{{ activity.name }}</b>
              </p>
              <p class="box-text2">
                {{ activity.distance }}m ({{ activity.category }}) /
                {{ activity.rotation }}
                <el-tag
                  effect="plain"
                  type="warning"
                  class="tag-status"
                  size="small"
                  v-if="
                    $store.getters.races.find((v) => v.id === activity.id)
                      .status
                  "
                  ><i class="el-icon-star-on"
                /></el-tag>
                <el-tag
                  effect="plain"
                  type="warning"
                  class="tag-status"
                  size="small"
                  v-else
                  ><i class="el-icon-star-off"
                /></el-tag>
              </p>
            </div>
            <div class="race-tag">
              <el-tag
                effect="dark"
                type="primary"
                class="tag"
                size="mini"
                v-if="activity.class == 'GⅠ'"
                >GⅠ</el-tag
              >
              <el-tag
                effect="dark"
                type="danger"
                class="tag"
                size="mini"
                v-else-if="activity.class == 'GⅡ'"
                >GⅡ</el-tag
              >
              <el-tag
                effect="dark"
                type="success"
                class="tag"
                size="mini"
                v-else-if="activity.class == 'GⅢ'"
                >GⅢ</el-tag
              >
              <el-tag
                effect="dark"
                type="warning"
                class="tag"
                size="mini"
                v-else-if="activity.class == 'OP'"
                >OP</el-tag
              >
              <el-tag
                effect="dark"
                type="warning"
                class="tag"
                size="mini"
                v-else-if="activity.class == 'Pre-OP'"
                >Pre-OP</el-tag
              >
              <el-tag
                effect="plain"
                type="success"
                class="tag"
                size="mini"
                v-if="activity.field == '芝'"
                >芝</el-tag
              >
              <el-tag
                effect="plain"
                type="warning"
                class="tag"
                size="mini"
                v-else-if="activity.field == 'ダート'"
                >ダート</el-tag
              >
            </div>
            <div class="fan">
              <el-tag type="info" class="tag-fan" size="small"
                >ファン数 +{{ activity.fan }}人</el-tag
              >
              <el-tag
                effect="dark"
                type="danger"
                class="tag-info"
                size="small"
                v-if="activity.isTarget"
                >シナリオ</el-tag
              >
              <el-tag
                effect="dark"
                type="primary"
                class="tag-info"
                size="small"
                v-else-if="activity.isSelected"
                >選択中</el-tag
              >
              <el-tag
                effect="plain"
                type="info"
                class="tag-info"
                size="small"
                v-else
                >適正OK</el-tag
              >
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
      <el-button
        type="danger"
        round
        class="btn btn-default"
        @click="showModal(false, 'activities')"
      >
        閉じる
      </el-button>
    </modal>
    <h3>
      <i class="el-icon-s-marketing" />レースカレンダー<el-button
        icon="el-icon-question"
        type="text"
        class="help-button"
        @click="showModal(true, 'help-4')"
      ></el-button>
    </h3>
    <modal
      name="help-4"
      width="90%"
      height="auto"
      :scrollable="true"
      class="help-modal"
      ><h3><i class="el-icon-question" /> 使い方</h3>
      <div class="help-modal-text">
        <p>
          <b>『レースカレンダー』</b
          >では、各時期に開催される適正内のレースやシナリオの目標となっているレース、目標外として出走するレースを確認できます。また、目標外のレースにおいては個別に出走/非出走を編集することができます。
        </p>
        <h4>
          <i class="el-icon-caret-bottom" />シナリオの目標となっているレース
        </h4>
        <p>
          シナリオの目標となっているレースは<b>赤色</b>で表示されます。同時期のその他のレースは全て非表示になります。
        </p>
        <h4>
          <i
            class="el-icon-caret-bottom"
          />現在のスケジュールで出走予定の目標外レース
        </h4>
        <p>
          現在のスケジュールで出走予定の目標外レースは<b>青色</b>で表示されます。
        </p>
        <h4><i class="el-icon-caret-bottom" />目標外出走レースの編集</h4>
        <p>
          <b
            >「選択中」もしくは「未選択」と表示されているボタンをクリックすることで各レースごとに個別に出走するかどうかを編集することができ、変更内容はただちに「予想獲得ファン数」や「出走スケジュール」へと反映されます</b
          >。これらの個別編集は「詳細設定」における「最大連続出場レース数」や「夏合宿中は目標外レースに出場しない」といった設定を無視して行うことができます。なお、キャラクターを変更したり、おすすめのスケジュールを再作成した場合、これらの編集内容は全て上書きされるので注意してください。
        </p>
      </div>
      <el-button
        type="danger"
        round
        class="btn btn-default"
        @click="showModal(false, 'help-4')"
      >
        閉じる
      </el-button>
    </modal>
    <div id="calendar">
      <template v-for="(item, id) in calendar">
        <el-card
          class="box-card"
          :key="id"
          v-if="12 <= id && id <= 71"
          shadow="never"
        >
          <h4 class="calendar-name">{{ item.name }}</h4>
          <p class="info-text" v-if="item.races.length == 0">
            表示可能なレースがありません
          </p>
          <template v-for="item2 in item.races">
            <el-card
              class="box-card2"
              :class="borderColor(item2)"
              :key="item2.id"
              shadow="hover"
            >
              <div class="race-text">
                <p class="box-text1">
                  <b>{{ item2.name }}</b>
                </p>
                <p class="box-text2">
                  {{ item2.distance }}m ({{ item2.category }}) /
                  {{ item2.rotation }}
                  <el-tag
                    effect="plain"
                    type="warning"
                    class="tag-status"
                    size="small"
                    v-if="
                      $store.getters.races.find((v) => v.id === item2.id).status
                    "
                    ><i class="el-icon-star-on"
                  /></el-tag>
                  <el-tag
                    effect="plain"
                    type="warning"
                    class="tag-status"
                    size="small"
                    v-else
                    ><i class="el-icon-star-off"
                  /></el-tag>
                </p>
              </div>
              <div class="race-tag">
                <el-tag
                  effect="dark"
                  type="primary"
                  class="tag"
                  size="mini"
                  v-if="item2.class == 'GⅠ'"
                  >GⅠ</el-tag
                >
                <el-tag
                  effect="dark"
                  type="danger"
                  class="tag"
                  size="mini"
                  v-else-if="item2.class == 'GⅡ'"
                  >GⅡ</el-tag
                >
                <el-tag
                  effect="dark"
                  type="success"
                  class="tag"
                  size="mini"
                  v-else-if="item2.class == 'GⅢ'"
                  >GⅢ</el-tag
                >
                <el-tag
                  effect="dark"
                  type="warning"
                  class="tag"
                  size="mini"
                  v-else-if="item2.class == 'OP'"
                  >OP</el-tag
                >
                <el-tag
                  effect="dark"
                  type="warning"
                  class="tag"
                  size="mini"
                  v-else-if="item2.class == 'Pre-OP'"
                  >Pre-OP</el-tag
                >
                <el-tag
                  effect="plain"
                  type="success"
                  class="tag"
                  size="mini"
                  v-if="item2.field == '芝'"
                  >芝</el-tag
                >
                <el-tag
                  effect="plain"
                  type="warning"
                  class="tag"
                  size="mini"
                  v-else-if="item2.field == 'ダート'"
                  >ダート</el-tag
                >
              </div>
              <div class="fan">
                <el-tag type="info" class="tag-fan" size="small"
                  >ファン数 +{{ item2.fan }}人</el-tag
                >
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="目標レースには必ず出走する必要があります！"
                  placement="bottom-start"
                  v-if="item2.isTarget"
                >
                  <el-tag
                    effect="dark"
                    type="danger"
                    class="tag-info"
                    size="small"
                    >シナリオ</el-tag
                  >
                </el-tooltip>
                <el-tag
                  effect="dark"
                  type="primary"
                  class="tag-info"
                  size="small"
                  v-else-if="item2.isSelected"
                  @click="onSelectRace(item2, item, false)"
                  >選択中</el-tag
                >
                <el-tag
                  effect="plain"
                  type="info"
                  class="tag-info"
                  size="small"
                  v-else
                  @click="onSelectRace(item2, item, true)"
                  >未選択</el-tag
                >
              </div>
            </el-card>
          </template>
        </el-card>
      </template>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import firebase from "firebase";
import fan_quota from "@/../public/data/fan_quota.json";
export default {
  data() {
    return {
      character: [{}],
      scenarios: ["URAファイナルズ"],
      scenario: "URAファイナルズ",
      appropriate: ["A", "B", "C", "D", "E", "F", "G"],
      activities: [],
      calendar: [],
      fields: [true, true],
      distances: [true, true, true, true],
      classes: [true, true, true, true, true],
      not_win_only: false,
      min_app: "A",
      fan_bonus: 45,
      race_limit_num: 2,
      is_ban_summer: true,
      fan_sum: 0,
      fan_debut: 700,
      fan_extra: 7000 + 10000 + 30000,
      strategies: [
        { name: "fan", text: "ファン数最大化(ファン活・金策向け)" },
        { name: "efficient", text: "ノルマ達成効率重視" },
      ], // { name: "trophy", text: "トロフィー埋め" },
      strategy: { name: "efficient", text: "ノルマ達成効率重視" },
      quota_leeway: 10,
      fan_quota: [],
      dp: [], //レースレコメンド計算用のDP配列(月×連続出走回数×累積出走回数)
      mem: [], //レースレコメンド復元用の配列
      dp_cnt: [], //出走レースカウント用のDP配列
      is_show_detail: false,
      is_failed: false,
    };
  },
  mounted: function () {
    this.character = this.$store.state.characters[0];
    for (let i = 0; i < 72; i++) this.calendar.push({});
    this.calendar.push({ name: "育成終了時" }); //育成終了時(ダミー)
    this.getAndSetTrophies();
    this.setFanQuota();
    this.setCalendar(true);
  },
  methods: {
    ...mapActions([
      "login",
      "setLoginUser",
      "logout",
      "deleteLoginUser",
      "setLoginStatus",
      "getCsv",
    ]),
    ...mapGetters(["uid", "isLogin", "races"]),
    borderColor(item) {
      if (item.isTarget) return "border-red";
      else if (item.isSelected) return "border-blue";
      else return "";
    },
    setFanQuota() {
      //ファン数目標のリセット
      this.fan_quota = JSON.parse(JSON.stringify(fan_quota[this.scenario]));
      //一部のダートウマ娘のみ条件緩和あり
      if (
        this.character.name === "ハルウララ" ||
        this.character.name === "スマートファルコン"
      ) {
        if (this.scenario === "URAファイナルズ") {
          this.fan_quota.find((item) => item.id === 3).num = 40000;
          this.fan_quota.find((item) => item.id === 4).num = 60000;
          this.fan_quota.find((item) => item.id === 5).num = 80000;
        }
      }
      //ファン数目標があれば追加
      let fan_targets = this.character.targets[this.scenarios].filter(
        (v) => v.type === "fan"
      );
      for (let i = 0; i < fan_targets.length; i++) {
        let ft = fan_targets[i];
        this.fan_quota.push({
          id: ft.id,
          term_id: ft.term_id,
          num: ft.num,
          text: this.character.name + "の育成目標",
          type: ft.type,
          status: true,
        });
      }
      //レース勝利数目標があれば追加
      let victory_targets = this.character.targets[this.scenarios].filter(
        (v) => v.type === "victory"
      );
      for (let i = 0; i < victory_targets.length; i++) {
        let vt = victory_targets[i];
        this.fan_quota.push({
          id: vt.id,
          term_id: vt.term_id,
          classes: vt.classes,
          cnt: vt.cnt,
          text: this.character.name + "の育成目標",
          type: vt.type,
          status: true,
        });
      }
      this.fan_quota.sort(function (a, b) {
        return a.term_id - b.term_id;
      });
    },
    onSelectRace(item2, item, type) {
      //type=trueの場合は既にselectedなレースをoffに
      for (let i = 0; i < item.races.length; i++) {
        let item3 = item.races[i];
        Vue.set(item3, "isSelected", false);
      }
      Vue.set(item2, "isSelected", type);
      this.setActivities();
      this.setCalendar(false);
    },
    checkFanAndQuotas() {
      this.is_failed = false;
      this.fan_sum = this.fan_debut;
      let race_sum = new Array(5).fill(0);
      for (let i = 0; i < 72; i++) {
        //ファン数の追加
        for (let j = 0; j < this.calendar[i].races.length; j++) {
          let race = this.calendar[i].races[j];
          if (race.isTarget || race.isSelected) {
            if (this.checkAppropriate(i, j) < 2) {
              race_sum[this.checkClassIdx(i, j)] += 1;
              this.fan_sum += race.fan;
            }
          }
        }
        //ファン数ノルマチェック
        if (
          this.fan_quota.some(
            (v) => v.term_id === i + 1 && v.status && v.type !== "victory"
          )
        ) {
          let quota = this.fan_quota.find(
            (v) => v.term_id === i + 1 && v.status && v.type !== "victory"
          ).num;
          if (
            this.fan_sum * (1 + this.fan_bonus / 100) <
            quota * (1 + this.quota_leeway / 100)
          ) {
            this.is_failed = true;
          }
        }
        //レース勝利ノルマチェック
        if (
          this.fan_quota.some(
            (v) => v.term_id === i + 1 && v.status && v.type === "victory"
          )
        ) {
          let quota = this.fan_quota.find(
            (v) => v.term_id === i + 1 && v.status && v.type === "victory"
          );

          let cnt = 0;
          for (let l = 0; l < 5; l++) cnt += race_sum[l] * quota.classes[l];
          if (cnt < quota.cnt) {
            this.is_failed = true;
          }
        }
      }
      this.fan_sum += this.fan_extra;
      //最終ノルマチェック(基準ノルマを満たせていないDPは全て無効化)
      if (this.fan_quota.some((v) => v.term_id === 73 && v.status)) {
        let quota = this.fan_quota.find(
          (v) => v.term_id === 73 && v.status
        ).num;
        if (
          this.fan_sum * (1 + this.fan_bonus / 100) <
          quota * (1 + this.quota_leeway / 100)
        ) {
          this.is_failed = true;
        }
      }
    },
    clearSelectedRaces() {
      for (let i = 0; i < 72; i++) {
        for (let j = 0; j < this.calendar[i].races.length; j++) {
          let race = this.calendar[i].races[j];
          if (race.isSelected) {
            Vue.set(race, "isSelected", false);
          }
        }
      }
    },
    setActivities() {
      this.activities = []; //アクティビティ初期化
      for (let i = 0; i < 72; i++) {
        for (let j = 0; j < this.calendar[i].races.length; j++) {
          let race = this.calendar[i].races[j];
          if (race.isTarget || race.isSelected) {
            this.activities.push(race);
          }
        }
      }
      this.checkFanAndQuotas();
    },
    showModal(status, name) {
      if (status) this.$modal.show(name);
      else this.$modal.hide(name);
    },
    setCalendar(isDP) {
      //適性に応じたフィルタ自動変更
      this.fields[0] = this.character.field_1 <= this.min_app;
      this.fields[1] = this.character.field_2 <= this.min_app;
      this.distances[0] = this.character.distance_1 <= this.min_app;
      this.distances[1] = this.character.distance_2 <= this.min_app;
      this.distances[2] = this.character.distance_3 <= this.min_app;
      this.distances[3] = this.character.distance_4 <= this.min_app;
      //カレンダーへのレース登録処理
      for (let i = 0; i < 72; i++) {
        let season = "";
        if (i < 24) season = "ジュニア級";
        else if (i < 48) season = "クラシック級";
        else if (i < 72) season = "シニア級";
        let month = Math.floor((i % 24) / 2) + 1;
        let term = "";
        if (i % 2 == 0) term = "月前半";
        else term = "月後半";
        Vue.set(this.calendar[i], "name", season + month + term);
        Vue.set(this.calendar[i], "races", new Array());
        //目標レースがある場合
        let isTarget = false;
        let race_targets = this.character.targets[this.scenarios].filter(
          (v) => v.type === "race"
        );
        for (let j = 0; j < race_targets.length; j++) {
          let target = race_targets[j];
          const race = this.$store.getters.races.find(
            (v) => v.name === target.name
          );
          if (
            target.grade === Math.floor(i / 24) + 1 &&
            race.term_id === (i % 24) + 1
          ) {
            isTarget = true;
            Vue.set(this.calendar[i], "isTarget", true);
            let race2 = JSON.parse(JSON.stringify(race));
            race2.isTarget = true;
            race2.term = season + race2.term;
            this.calendar[i].races.push(race2);
            break;
          }
        }
        //目標レースが無い場合(通常通りの追加)
        if (!isTarget) {
          Vue.set(this.calendar[i], "isTarget", false);
          for (let j = 0; j < this.$store.getters.races.length; j++) {
            let isValid = 1;
            let race = this.$store.getters.races[j];
            //開催時期
            if ((i % 24) + 1 !== race.term_id) isValid = 0;
            if (i < 24 && race.junior === 0) isValid = 0;
            if (24 <= i && i < 48 && race.classic === 0) isValid = 0;
            if (48 <= i && race.senior === 0) isValid = 0;
            //フィールド
            if (!this.fields[0] && race.field === "芝") isValid = 0;
            if (!this.fields[1] && race.field === "ダート") isValid = 0;
            //距離
            if (!this.distances[0] && race.category === "短距離") isValid = 0;
            if (!this.distances[1] && race.category === "マイル") isValid = 0;
            if (!this.distances[2] && race.category === "中距離") isValid = 0;
            if (!this.distances[3] && race.category === "長距離") isValid = 0;
            //クラス
            if (!this.classes[0] && race.class === "GⅠ") isValid = 0;
            if (!this.classes[1] && race.class === "GⅡ") isValid = 0;
            if (!this.classes[2] && race.class === "GⅢ") isValid = 0;
            if (!this.classes[3] && race.class === "OP") isValid = 0;
            if (!this.classes[4] && race.class === "Pre-OP") isValid = 0;
            //トロフィー未獲得のみ
            if (this.not_win_only && race.state === true) isValid = 0;
            //更新前のactivities内にある場合
            if (
              this.activities.some(
                (v) =>
                  v.name === race.name &&
                  v.term === this.calendar[i].name &&
                  !v.isTarget
              )
            )
              isValid = 2;
            if (isValid > 0) {
              //追加
              let race2 = JSON.parse(JSON.stringify(race));
              if (isValid == 2) {
                this.calendar[i].races.push(
                  this.activities.find(
                    (v) =>
                      v.name === race.name &&
                      v.term === this.calendar[i].name &&
                      !v.isTarget
                  )
                );
              } else {
                race2.term = this.calendar[i].name;
                this.calendar[i].races.push(race2);
              }
            }
          }
        }
      }
      if (isDP) {
        this.clearSelectedRaces();
        this.calculateDP();
      }
      this.setActivities();
      if (isDP) {
        if (!this.is_failed) {
          this.$notify({
            title: "Success",
            message: "おすすめのスケジュールを作成しました！",
            type: "success",
          });
        } else {
          this.$notify({
            title: "Failed",
            message: "スケジュールを設定できませんでした……。",
            type: "error",
          });
        }
      }
    },
    checkAppropriate(i, j) {
      let race = this.calendar[i].races[j];
      let app_cnt = 0;
      let app_field = "";
      let app_distance = "";
      //フィールド
      if (race.field === "芝") app_field = this.character.field_1;
      else if (race.field === "ダート") app_field = this.character.field_2;
      //距離
      if (race.category === "短距離") app_distance = this.character.distance_1;
      else if (race.category === "マイル")
        app_distance = this.character.distance_2;
      else if (race.category === "中距離")
        app_distance = this.character.distance_3;
      else if (race.category === "長距離")
        app_distance = this.character.distance_4;
      app_cnt += app_field.charCodeAt(0) - 65;
      app_cnt += app_distance.charCodeAt(0) - 65;
      return app_cnt;
    },
    checkRequirement(i, j) {
      let race = this.calendar[i].races[j];
      if (race.class === "OP" || race.class === "Pre-OP") return 375;
      else return race.requirement;
    },
    checkClassIdx(i, j) {
      let race = this.calendar[i].races[j];
      if (race.class === "GⅠ") return 0;
      else if (race.class === "GⅡ") return 1;
      else if (race.class === "GⅢ") return 2;
      else if (race.class === "OP") return 3;
      else if (race.class === "Pre-OP") return 4;
    },
    calculateDP() {
      // DPテーブルの初期化
      const INF = 1000000000;
      const N = 72;
      const M = this.race_limit_num;
      for (let i = 0; i < N + 1; i++) {
        this.dp[i] = [];
        this.mem[i] = [];
        this.dp_cnt[i] = [];
        for (let j = 0; j < N + 1; j++) {
          this.dp[i][j] = new Array(N + 1).fill(-INF); //初期値は十分に小さな値
          this.mem[i][j] = new Array(N + 1).fill(-INF); //初期値は-1(レースに出ない)
          this.dp_cnt[i][j] = [];
          for (let k = 0; k < N + 1; k++) {
            this.dp_cnt[i][j][k] = new Array(5).fill(0); //初期値は0(レースに出ない)
          }
        }
      }
      this.dp[12][1][0] = this.fan_debut; //12ターン目(メイクデビュー)に基礎ファン数700人(累積出走に含めず)
      for (let i = 12; i < N; i++) {
        //目標レースがある場合
        if (this.calendar[i].isTarget) {
          let l = this.calendar[i].races.findIndex((v) => v.isTarget);
          let fan = this.calendar[i].races[l].fan;
          //適正が2段階以上低いレースは勝利しないものと想定
          if (this.checkAppropriate(i, l) >= 2) fan = 0;
          for (let j = 0; j < N; j++) {
            for (let k = 0; k < N; k++) {
              if (
                this.checkRequirement(i, l) <=
                this.dp[i][j][k] * (1 + this.fan_bonus / 100)
              ) {
                this.dp[i + 1][j + 1][k + 1] = this.dp[i][j][k] + fan; //目標レースに必ず出場
                this.mem[i + 1][j + 1][k + 1] = l;
                for (let m = 0; m < 5; m++)
                  this.dp_cnt[i + 1][j + 1][k + 1][m] = this.dp_cnt[i][j][k][m];
                this.dp_cnt[i + 1][j + 1][k + 1][this.checkClassIdx(i, l)] += 1;
              }
            }
          }
        }
        //目標レースはないが、夏合宿中はレースに出ない場合
        else if (
          this.is_ban_summer &&
          ((36 <= i && i <= 39) || (60 <= i && i <= 63))
        ) {
          for (let j = 0; j < N + 1; j++) {
            for (let k = 0; k < N + 1; k++) {
              if (this.dp[i + 1][0][k] < this.dp[i][j][k]) {
                //適正チェック
                this.dp[i + 1][0][k] = this.dp[i][j][k]; //レースに出ない場合
                this.mem[i + 1][0][k] = -1;
                for (let m = 0; m < 5; m++)
                  this.dp_cnt[i + 1][0][k][m] = this.dp_cnt[i][j][k][m];
              }
            }
          }
        }
        //目標レースがない場合
        else {
          for (let j = 0; j < N + 1; j++) {
            for (let k = 0; k < N + 1; k++) {
              if (this.dp[i + 1][0][k] < this.dp[i][j][k]) {
                this.dp[i + 1][0][k] = this.dp[i][j][k]; //レースに出ない場合
                this.mem[i + 1][0][k] = -1;
                for (let m = 0; m < 5; m++)
                  this.dp_cnt[i + 1][0][k][m] = this.dp_cnt[i][j][k][m];
              }
            }
            for (let k = 0; k < N; k++) {
              for (let l = 0; l < this.calendar[i].races.length; l++) {
                let fan = this.calendar[i].races[l].fan;
                //適正が2段階以上低いレースは勝利しないものと想定
                if (this.checkAppropriate(i, l) >= 2) fan = 0;
                if (j + 1 <= M)
                  if (this.dp[i + 1][j + 1][k + 1] < this.dp[i][j][k] + fan) {
                    if (
                      this.checkRequirement(i, l) <=
                      this.dp[i][j][k] * (1 + this.fan_bonus / 100)
                    ) {
                      this.dp[i + 1][j + 1][k + 1] = this.dp[i][j][k] + fan; //l番目のレースに出る場合
                      this.mem[i + 1][j + 1][k + 1] = l;
                      for (let m = 0; m < 5; m++)
                        this.dp_cnt[i + 1][j + 1][k + 1][m] =
                          this.dp_cnt[i][j][k][m];
                      this.dp_cnt[i + 1][j + 1][k + 1][
                        this.checkClassIdx(i, l)
                      ] += 1;
                    }
                  }
              }
            }
          }
        }
        //ファン数ノルマチェック(基準ノルマを満たせていないDPは全て無効化)
        if (
          this.fan_quota.some(
            (v) => v.term_id === i + 1 && v.status && v.type !== "victory"
          )
        ) {
          let quota = this.fan_quota.find(
            (v) => v.term_id === i + 1 && v.status && v.type !== "victory"
          ).num;
          for (let j = 0; j < N + 1; j++) {
            for (let k = 0; k < N + 1; k++) {
              if (
                this.dp[i + 1][j][k] * (1 + this.fan_bonus / 100) <
                quota * (1 + this.quota_leeway / 100)
              ) {
                this.dp[i + 1][j][k] = -INF;
                this.mem[i + 1][j][k] = -1;
              }
            }
          }
        }
        //レース勝利ノルマチェック(基準ノルマを満たせていないDPは全て無効化)
        if (
          this.fan_quota.some(
            (v) => v.term_id === i + 1 && v.status && v.type === "victory"
          )
        ) {
          let quota = this.fan_quota.find(
            (v) => v.term_id === i + 1 && v.status && v.type === "victory"
          );
          for (let j = 0; j < N + 1; j++) {
            for (let k = 0; k < N + 1; k++) {
              let cnt = 0;
              for (let l = 0; l < 5; l++)
                cnt += this.dp_cnt[i + 1][j][k][l] * quota.classes[l];
              if (cnt < quota.cnt) {
                this.dp[i + 1][j][k] = -INF;
                this.mem[i + 1][j][k] = -1;
              }
            }
          }
        }
      }
      //エクストラシナリオ分のファン数追加
      for (let j = 0; j < N + 1; j++) {
        for (let k = 0; k < N + 1; k++) {
          this.dp[N][j][k] += this.fan_extra;
        }
      }
      //最終ノルマチェック(基準ノルマを満たせていないDPは全て無効化)
      if (this.fan_quota.some((v) => v.term_id === N + 1 && v.status)) {
        let quota = this.fan_quota.find(
          (v) => v.term_id === N + 1 && v.status
        ).num;
        for (let j = 0; j < N + 1; j++) {
          for (let k = 0; k < N + 1; k++) {
            if (
              this.dp[N][j][k] * (1 + this.fan_bonus / 100) <
              quota * (1 + this.quota_leeway / 100)
            ) {
              this.dp[N][j][k] = -INF;
              this.mem[N][j][k] = -1;
            }
          }
        }
      }
      let best_j = 0;
      let best_k = 0;
      //戦略がfanもしくはtrophyの場合(ファン数重視)
      if (this.strategy.name !== "efficient") {
        let max_j = 0;
        let max_k = 0;
        for (let j = 0; j < N + 1; j++) {
          for (let k = 0; k < N + 1; k++) {
            if (
              this.dp[N][j][k] > 0 &&
              this.dp[N][max_j][max_k] <= this.dp[N][j][k]
            ) {
              max_j = j;
              max_k = k;
            }
          }
        }
        best_j = max_j;
        best_k = max_k;
      }
      //戦略がefficientの場合(目標達成可能な最小出場回数重視)
      else if (this.strategy.name === "efficient") {
        let max_j = 0;
        let max_k = INF;
        for (let j = 0; j < N + 1; j++) {
          for (let k = 0; k < N + 1; k++) {
            if (
              this.dp[N][j][k] > 0 &&
              (k < max_k ||
                (k === max_k && this.dp[N][max_j][max_k] < this.dp[N][j][k]))
            ) {
              max_j = j;
              max_k = k;
            }
          }
        }
        best_j = max_j;
        best_k = max_k;
      }
      // レコメンドレースの復元(レコメンド属性の登録)
      let j = best_j;
      let k = best_k;
      for (let i = N; i >= 13; i--) {
        //直近はレースに出場したというパターン
        if (j > 0) {
          //出場したレースの復元
          if (this.calendar[i - 1].isTarget === false) {
            Vue.set(
              this.calendar[i - 1].races[this.mem[i][j][k]],
              "isSelected",
              true
            );
          }
          //インデックスの更新(遷移前は必ずdp[i-1][j-1][k-1]のはずである)
          j--;
          k--;
        }
        //直近はレースに出ていないというパターン
        else if (j === 0) {
          //遷移前の検索(遷移前はdp[i-1][j][k]のはずである)
          for (let j2 = 0; j2 < N + 1; j2++) {
            if (this.dp[i - 1][j2][k] === this.dp[i][j][k]) {
              j = j2;
              break;
            }
          }
        }
      }
      //console.log(this.dp);
    },
    getAndSetTrophies() {
      var database = firebase.database();
      database
        .ref("user_trophies/" + this.$store.getters.uid)
        .once("value")
        .then((snapshot) => {
          this.trophies = JSON.parse(snapshot.val());
          if (this.trophies === null) this.trophies = [];
          for (let i = 0; i < this.$store.getters.races.length; i++) {
            if (this.trophies.includes(this.$store.getters.races[i].id)) {
              Vue.set(this.$store.state.races[i], "status", true);
            }
          }
        }); //ここアロー関数じゃないと動かない
    },
  },
};
</script>
<style scoped>
@media screen and (min-width: 480px) {
}
/deep/ .el-alert {
  margin-left: 10px !important;
  margin-right: 10px !important;
  width: auto !important;
}
/deep/ [class*="_column"] {
  padding-top: 7.5px !important;
  padding-bottom: 7.5px !important;
}
/deep/ .el-card__body {
  padding: 10px !important;
}
/deep/ .el-form-item__label {
  padding-right: 10px !important;
  padding-left: 10px !important;
}
/deep/ .el-form-item {
  margin-bottom: 7.5px !important;
}
/deep/ .el-timeline {
  padding-left: 20px !important;
}
.help-button {
  color: gray;
  margin-left: 5px;
}
.help-modal {
  padding-top: 20px;
  padding-bottom: 20px;
}
.help-modal-text {
  text-align: left;
  font-size: 14px;
  margin-left: 20px;
  margin-right: 20px;
}
.detail-collapse {
  position: relative;
  z-index: 0;
}
.detail-title {
  position: absolute;
  width: 130px;
  left: 0;
  right: 0;
  padding-top: 7.5px;
  margin: auto;
  z-index: 1;
}
.quota-collapse {
  position: relative;
  z-index: 0;
}
.quota-title {
  position: absolute;
  width: 220px;
  left: 0;
  right: 0;
  padding-top: 7.5px;
  margin: auto;
  z-index: 1;
}
.sticky-alert {
  position: sticky;
  top: 10px;
}
#calendar {
  display: table;
}
.form {
  border-color: lightgray;
}
.activities-modal {
  padding-top: 20px;
  padding-bottom: 20px;
}
.box-card {
  overflow-y: visible;
  width: 255px;
  height: 300px;
  margin: 5px;
  padding: 0px !important;
  display: inline-grid;
}
.box-card2 {
  width: 99%;
  height: auto;
  margin-left: 0px;
  margin-right: 0px;
  margin-bottom: 10px;
  padding: 0px;
}
.box-card4 {
  height: auto;
  margin-left: 0px;
  margin-right: 25px;
  margin-bottom: 10px;
  padding: 0px;
}
.info-text {
  font-size: 12px;
  margin-top: 100px;
}
.box-text1 {
  font-size: 14px;
  text-align: left;
  margin: 5px;
  margin-top: 0px;
}
.box-text2 {
  font-size: 13.5px;
  text-align: left;
  margin: 5px;
}
.box-image {
  height: 160px;
}
.calendar-name {
  margin-top: 10px;
  margin-bottom: 10px;
}
.race-text {
  display: inline-block;
  width: 80%;
  margin-top: 0px;
  vertical-align: top;
}
.race-tag {
  display: inline-block;
  width: 20%;
}
.tag {
  font-size: 10px;
  vertical-align: top;
  float: right;
  margin-top: 2.5px;
  margin-right: 5px;
}
.fan {
  vertical-align: center;
  text-align: center;
}
.tag-fan {
  width: 65%;
  display: inline-block;
  margin-right: 5px;
  color: darkslategrey !important;
}
.tag-info {
  width: 30%;
  font-size: 11px;
  margin-right: 5px;
  display: inline-block;
}
.tag-status {
  width: 5%;
  font-size: 11px;
  border: none;
  font-size: 15px;
  display: inline-block;
}
.web-button {
  margin-bottom: 5px !important;
}
.btn {
  margin: 10px;
}
.button-app {
  width: 60px;
}
.border-red {
  border-color: red;
  border-width: 2px;
}
.border-blue {
  border-color: dodgerblue;
  border-width: 2px;
}
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
::-webkit-scrollbar {
  width: 7.5px;
}
::-webkit-scrollbar-track {
  background: #fff;
  border: none;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background: lightgray;
  border-radius: 10px;
  box-shadow: none;
}
</style>
